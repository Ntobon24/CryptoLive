import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import axios from 'axios';
import { CryptoDto } from './dto/crypto.dto';

@Injectable()
export class CryptoService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CryptoService.name);
  private intervalId: NodeJS.Timeout | null = null;
  private readonly symbols = ['BTCUSDT', 'ETHUSDT'];
  private readonly binanceApiUrl = 'https://api.binance.com/api/v3/ticker/price';

  async fetchCryptoPrices(): Promise<CryptoDto[]> {
    try {
      const prices: CryptoDto[] = [];

      for (const symbol of this.symbols) {
        const response = await axios.get(`${this.binanceApiUrl}?symbol=${symbol}`);
        prices.push({
          symbol: response.data.symbol,
          price: parseFloat(response.data.price),
          timestamp: Date.now(),
        });
      }

      this.logger.log(`Fetched prices for ${prices.length} cryptocurrencies`);
      return prices;
    } catch (error) {
      this.logger.error('Error fetching crypto prices:', error instanceof Error ? error.message : String(error));
      return [];
    }
  }

  onModuleInit() {
    this.logger.log('CryptoService initialized');
  }

  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.logger.log('CryptoService interval cleared');
    }
  }

  startPriceUpdates(callback: (prices: CryptoDto[]) => void) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(async () => {
      const prices = await this.fetchCryptoPrices();
      callback(prices);
    }, 5000);

    this.logger.log('Started crypto price updates every 5 seconds');
  }

  stopPriceUpdates() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.logger.log('Stopped crypto price updates');
    }
  }
}
