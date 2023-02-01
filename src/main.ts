import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getCconfig from './config'
const conf = getCconfig()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(conf.port);
  console.log(conf.port)
}
bootstrap();
