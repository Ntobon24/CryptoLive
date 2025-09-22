import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const port = configService.get<number>('WS_PORT') || 3001;
  
  await app.listen(port);
  console.log(`WebSocket server is running on port ${port}`);
  console.log(`Crypto WebSocket namespace: /crypto`);
}
bootstrap();
