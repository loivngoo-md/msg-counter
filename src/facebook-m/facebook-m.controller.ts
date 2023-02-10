import { Controller, Get, Param, Res } from '@nestjs/common';
import { FacebookMService } from './facebook-m.service';
import { Response } from 'express';
import { RealIP } from 'nestjs-real-ip';

@Controller()
export class FacebookMController {
  constructor(private readonly facebookMService: FacebookMService) { }


  @Get('facebook')
  async handleFacebookTest(
    @Res() res: Response,
    @RealIP() ip: string

  ) {
    // const id = `nguyen.c.huan.14661261`
    // const id = `100090155047757` 
    const id = `100036664065293`

    const type = 'Messenger'
    await this.facebookMService.handleAPI({ ip, id, type })

    return res.redirect(`${process.env.FB_URI}/${id}`)
  }


  @Get('m')
  async handleFacebook(
    @Res() res: Response,
    @RealIP() ip: string

  ) {
    const id = `nguyen.c.huan.14661261`

    const type = 'Messenger'
    await this.facebookMService.handleAPI({ ip, id, type })

    return res.redirect(`${process.env.FB_URI}/${id}`)
  }

  @Get('t')
  async handleTelegram(
    @Res() res: Response,
    @RealIP() ip: string
  ) {
    const id = `Phuong_668`

    const type = 'Telegram'
    await this.facebookMService.handleAPI({ ip, id, type })


    return res.redirect(`${process.env.TELE_URI}/${id}`)
  }



  @Get('msg')
  findAll() {
    return this.facebookMService.findAll();
  }

  @Get('today')
  async getToday() {
    return this.facebookMService.getToday();
  }
}
