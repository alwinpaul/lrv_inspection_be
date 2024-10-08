import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173', 'https://keolis.benchfix.com', 'http://keolis.benchfix.com'],
    credentials: true
  })
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
