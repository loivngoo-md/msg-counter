import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { MSG, MSGDocument } from 'src/database/schema/facebook-m.schema';
import { calcTime, convertDateTimeVNToTimestamp, convertTimestampToDateTime, getVietnamTime } from 'src/helpers';
import { Repository } from 'typeorm';
import { CreateFacebookMDto } from './dto/create-facebook-m.dto';
import { UpdateFacebookMDto } from './dto/update-facebook-m.dto';
import { FacebookM } from './entities/facebook-m.entity';

@Injectable()
export class FacebookMService {

  constructor(
    // @InjectRepository(FacebookM)
    // private readonly _repos: Repository<FacebookM>,

    @InjectModel(MSG.name) private MSGModel: Model<MSGDocument>
  ) { }

  getVietnamTime() {
    var today = new Date();
    var offset = 14; // Vietnam timezone offset
    var utc = today.getTime() + (today.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  }

  async getToday() {

    let countTele = 0
    let countFb = 0

    const date = new Date()

    let now = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    const data = await this.MSGModel.find({ date: now });

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
        date: e.date
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

    const data = await this.MSGModel.find().select('url ip created_at id_fb, type').sort({ created_at: -1 })

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
      timeZone: 'Asia/Ho_Chi_Minh'
    })

    let now = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    console.log(now);
    

    const e = new this.MSGModel({
      id_fb: id,
      ip,
      url: uri,
      created_at: time,
      type,
      date: now
    })

    await e.save()
    return Redirect(uri + id)
  }
}
