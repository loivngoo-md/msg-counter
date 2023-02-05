import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MSGDocument = HydratedDocument<MSG>;

@Schema()
export class MSG {
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

  @Prop()
  date: string
}

export const MSGSchema = SchemaFactory.createForClass(MSG);