import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoDto } from './dto/crypto.dto';

@WebSocketGateway({
  namespace: 'crypto',
  cors: {
    origin: '*',
  },
})
export class CryptoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(CryptoGateway.name);
  private connectedClients = 0;

  constructor(private readonly cryptoService: CryptoService) {}

  async handleConnection(client: Socket) {
    this.connectedClients++;
    this.logger.log(`Client connected: ${client.id}. Total clients: ${this.connectedClients}`);

    const initialPrices = await this.cryptoService.fetchCryptoPrices();
    client.emit('crypto_update', initialPrices);

    if (this.connectedClients === 1) {
      this.startPriceUpdates();
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedClients--;
    this.logger.log(`Client disconnected: ${client.id}. Total clients: ${this.connectedClients}`);

    if (this.connectedClients === 0) {
      this.stopPriceUpdates();
    }
  }

  @SubscribeMessage('get_crypto_prices')
  async handleGetCryptoPrices(client: Socket): Promise<void> {
    this.logger.log(`Client ${client.id} requested crypto prices`);
    const prices = await this.cryptoService.fetchCryptoPrices();
    client.emit('crypto_update', prices);
  }

  private startPriceUpdates() {
    this.cryptoService.startPriceUpdates((prices: CryptoDto[]) => {
      this.server.emit('crypto_update', prices);
    });
  }

  private stopPriceUpdates() {
    this.cryptoService.stopPriceUpdates();
  }
}
