import { PartialType } from '@nestjs/mapped-types';
import { CreateFacebookMDto } from './create-facebook-m.dto';

export class UpdateFacebookMDto extends PartialType(CreateFacebookMDto) {}
