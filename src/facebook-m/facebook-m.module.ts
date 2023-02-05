import { Module } from '@nestjs/common';
import { FacebookMService } from './facebook-m.service';
import { FacebookMController } from './facebook-m.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacebookM } from './entities/facebook-m.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FBM, FBMSchema } from 'src/database/schema/facebook-m.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FBM.name, schema: FBMSchema }])
  ],
  controllers: [FacebookMController],
  providers: [FacebookMService]
})
export class FacebookMModule { }
