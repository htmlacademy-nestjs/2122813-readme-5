import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

const globalPrefix = process.env.PREFIX;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('The «Users» service')
  .setDescription('Users service API')
  .setVersion('1.0')
  .build();

  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('application.port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🎯  Current mode: ${configService.get('application.environment')}`
  )
}
bootstrap();
