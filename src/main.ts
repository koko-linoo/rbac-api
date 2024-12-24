import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import path from 'path';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.timestamp(),
          ),
        }),
        new winston.transports.File({
          filename: 'errors.log',
          level: 'error',
          dirname: path.join(__dirname, './../logs'),
          format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
          ),
        }),
        new winston.transports.File({
          filename: 'debug.log',
          level: 'debug',
          dirname: path.join(__dirname, './../logs'),
          format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
          ),
        }),
      ],
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('RBAC API')
    .setDescription('The RBAC API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3001);

  console.log('Listening at http://localhost:3001');
}
bootstrap();
