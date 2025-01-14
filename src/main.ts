import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
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

  // Create WebSocket instance
  const wsApp = await NestFactory.create(AppModule);

  wsApp.useWebSocketAdapter(new IoAdapter(wsApp));

  await wsApp.listen(3002);

  console.log('WebSocket server running on ws://localhost:3002');
}
bootstrap();
