import { type NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Setups } from './setups';
import { AppModule } from './app.module';

async function bootstrap() {
  const configModule: NestApplicationOptions = {};

  const app = await NestFactory.create(AppModule, configModule);

  // Filtro global de exceção
  const {
    HttpExceptionFilter,
  } = require('../../shared/errors/httpExceptionFilter');
  app.useGlobalFilters(new HttpExceptionFilter());

  await Setups.setApp(app).middlewares().startDependencies();

  Setups.setApp(app).swagger();

  await app.listen(process.env.APP_PORT ?? 3000);
}

bootstrap().catch((e) => {
  console.error(e);
});
