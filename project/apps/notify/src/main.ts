import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const globalPrefix = process.env.PREFIX;
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
