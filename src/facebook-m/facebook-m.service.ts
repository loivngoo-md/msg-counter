import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { FBM, FBMDocument } from 'src/database/schema/facebook-m.schema';
import { calcTime } from 'src/helpers';
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

  async getToday() {
    let countTele = 0
    let countFb = 0
    var start = new Date();
    start.setHours(0, 0, 0, 0);



    var end = new Date();
    end.setHours(23, 59, 59, 999);
    console.log(start, end);
    

    const data = await this.fbmModel.find({date: { $gte: start, $lt: end } });

    // const data = await this._repos.find({ select: ['url', 'ip', 'id_fb', 'created_at'] })
    const response = data.map((e) => {

      if (e.type == 'Telegram') {
        countTele += 1
      } else if (e.type == 'Messenger') {
        countFb += 1
      }
      return {
        ip: e.ip,
        url: e.url,
        type: e.type,
        time: e.created_at,
      }
    })
    return {
      count: response.length,
      telegram: countTele,
      messenger: countFb,
      data: response,
    }
  }

  async findAll() {
    let countTele = 0
    let countFb = 0

    const data = await this.fbmModel.find().select('url ip created_at id_fb, type').sort({ created_at: -1 })

    // const data = await this._repos.find({ select: ['url', 'ip', 'id_fb', 'created_at'] })
    const response = data.map((e) => {

      if (e.type == 'Telegram') {
        countTele += 1
      } else if (e.type == 'Messenger') {
        countFb += 1
      }
      return {
        ip: e.ip,
        url: e.url,
        type: e.type,
        time: e.created_at,
      }
    })
    return {
      count: response.length,
      telegram: countTele,
      messenger: countFb,
      data: response,
    }
  }

  async handleAPI({ id, ip, type }) {

    let uri = ''
    if (type === 'Telegram') {
      uri = `${process.env.TELE_URI}/${id}`
    } else {
      uri = `${process.env.FB_URI}/${id}`
    }

    const date = new Date()

    let time = date.toLocaleString("en-US", {
      timeZone: 'Asia/Bangkok'
    })

    const e = new this.fbmModel({
      id_fb: id,
      ip,
      url: uri,
      created_at: time,
      type,
      date: new Date()
    })

    await e.save()

    // const el = this._repos.create({ id_fb: id, ip, url: uri + id })
    // await this._repos.save(el)

    return Redirect(uri + id)
  }
}
