import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookMModule } from './facebook-m/facebook-m.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FacebookMModule,
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
