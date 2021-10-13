import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as yaml from 'yaml';
import * as fs from 'fs';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const config = new DocumentBuilder()
    .setTitle('Skeleton')
    .setDescription('Nestjs boilerplate project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync(
    join(__dirname, '../../docs/swagger.yaml'),
    yaml.stringify(document),
  );

  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
