import { Injectable, Redirect } from '@nestjs/common';
import { CreateFacebookMDto } from './dto/create-facebook-m.dto';
import { UpdateFacebookMDto } from './dto/update-facebook-m.dto';

@Injectable()
export class FacebookMService {
  create(createFacebookMDto: CreateFacebookMDto) {
    return 'This action adds a new facebookM';
  }

  findAll() {
    return `This action returns all facebookM`;
  }

  findOne(id: string) {
    const uri = process.env.FB_URI
    return Redirect(uri + id)
  }

  update(id: number, updateFacebookMDto: UpdateFacebookMDto) {
    return `This action updates a #${id} facebookM`;
  }

  remove(id: number) {
    return `This action removes a #${id} facebookM`;
  }
}
