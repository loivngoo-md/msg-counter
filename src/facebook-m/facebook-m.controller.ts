import { Controller, Get, Param, Res } from '@nestjs/common';
import { FacebookMService } from './facebook-m.service';
import { Response } from 'express';
import { RealIP } from 'nestjs-real-ip';

@Controller()
export class FacebookMController {
  constructor(private readonly facebookMService: FacebookMService) { }



  @Get('m/:id')
  async handleFacebook(
    @Param('id') id: string,
    @Res() res: Response,
    @RealIP() ip: string
  ) {

    await this.facebookMService.handleAPI({ ip, id })

    return res.redirect(`${process.env.FB_URI}/${id}`)
  }

  @Get('t/:id')
  async handleTelegram(
    @Param('id') id: string,
    @Res() res: Response,
    @RealIP() ip: string
  ) {

    await this.facebookMService.handleAPI({ ip, id })

    return res.redirect(`${process.env.TELE_URI}/${id}`)
  }



  @Get('msg')
  findAll() {
    return this.facebookMService.findAll();
  }
}
