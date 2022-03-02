import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita propiedad
      forbidNonWhitelisted: true, // genera error si hay propiedad sobrante
      // stopAtFirstError: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Wort Time System example')
    .setDescription('The work time system API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('projects')
    .addTag('total-time-logs')
    .addTag('work-time-logs')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('app_port') || 3000;

  await app.listen(port, () => {
    console.log(`App running in port ${port}`);
  });
}
bootstrap();
