import { Module } from '@nestjs/common';
import { CryptoGateway } from './crypto.gateway';
import { CryptoService } from './crypto.service';

@Module({
  providers: [CryptoGateway, CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
