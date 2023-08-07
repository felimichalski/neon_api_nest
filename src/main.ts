import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.APPENV == 'PRODUCTION'
    ? app.enableCors({
        origin: [
          'https://neoninfinito.com.ar',
          'https://www.neoninfinito.com.ar',
        ],
        credentials: true,
      })
    : app.enableCors({
        credentials: true,
      });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
