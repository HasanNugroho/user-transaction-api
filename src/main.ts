import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global pipes and CORS
  configureApp(app);

  // Set up Swagger
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

function configureApp(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors();
  app.useGlobalFilters(app.get(HttpExceptionFilter));
}

function setupSwagger(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('simple transaction')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
