import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FBMDocument = HydratedDocument<FBM>;

@Schema()
export class FBM {
  @Prop()
  ip: string;

  @Prop()
  id_fb: string;

  @Prop()
  url: string;

  @Prop()
  created_at: string

  @Prop()
  type: string
}

export const FBMSchema = SchemaFactory.createForClass(FBM);