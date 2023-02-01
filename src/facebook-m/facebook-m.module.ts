import { Module } from '@nestjs/common';
import { FacebookMService } from './facebook-m.service';
import { FacebookMController } from './facebook-m.controller';

@Module({
  controllers: [FacebookMController],
  providers: [FacebookMService]
})
export class FacebookMModule {}
