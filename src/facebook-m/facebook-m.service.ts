import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { FBM, FBMDocument } from 'src/database/schema/facebook-m.schema';
import { Repository } from 'typeorm';
import { CreateFacebookMDto } from './dto/create-facebook-m.dto';
import { UpdateFacebookMDto } from './dto/update-facebook-m.dto';
import { FacebookM } from './entities/facebook-m.entity';

@Injectable()
export class FacebookMService {

  constructor(
    // @InjectRepository(FacebookM)
    // private readonly _repos: Repository<FacebookM>,

    @InjectModel(FBM.name) private fbmModel: Model<FBMDocument>
  ) { }

  create(createFacebookMDto: CreateFacebookMDto) {
    return 'This action adds a new facebookM';
  }

  async findAll() {


    const data = await this.fbmModel.find().select('url ip created_at id_fb').sort({ created_at: -1 })

    // const data = await this._repos.find({ select: ['url', 'ip', 'id_fb', 'created_at'] })

    return {
      count: data.length,
      data,
    }
  }

  async handleAPI({ id, ip }) {

    const uri = `${process.env.FB_URI}/${id}`

    const e = new this.fbmModel({
      id_fb: id,
      ip,
      url: uri,
      created_at: new Date()
    })

    await e.save()


    // const el = this._repos.create({ id_fb: id, ip, url: uri + id })
    // await this._repos.save(el)

    return Redirect(uri + id)
  }

  update(id: number, updateFacebookMDto: UpdateFacebookMDto) {
    return `This action updates a #${id} facebookM`;
  }

  remove(id: number) {
    return `This action removes a #${id} facebookM`;
  }
}
