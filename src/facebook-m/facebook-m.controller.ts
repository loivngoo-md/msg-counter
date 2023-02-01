import { Controller, Get, Param, Res } from '@nestjs/common';
import { FacebookMService } from './facebook-m.service';
import { Response } from 'express';
import { RealIP } from 'nestjs-real-ip';

@Controller('msg')
export class FacebookMController {
  constructor(private readonly facebookMService: FacebookMService) { }



  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @RealIP() ip: string
  ) {

    await this.facebookMService.handleAPI({ ip, id })

    return res.redirect(`${process.env.FB_URI}/${id}`)
  }

  @Get()
  findAll() {
    return this.facebookMService.findAll();
  }
}
