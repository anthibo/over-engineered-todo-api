import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  console.log(
    `${configService.get('HISTORY_PERSISTENCE_HOST')}:${configService.get(
      'HISTORY_PERSISTENCE_PORT',
    )}`,
  );
  app.enableCors();

  await app.listen(port);
}
bootstrap();
