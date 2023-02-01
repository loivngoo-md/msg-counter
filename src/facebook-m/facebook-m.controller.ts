import { Controller, Get, Param, Res } from '@nestjs/common';
import { FacebookMService } from './facebook-m.service';
import { Response } from 'express';

@Controller('msg')
export class FacebookMController {
  constructor(private readonly facebookMService: FacebookMService) { }

  @Get()
  findAll() {
    return this.facebookMService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Res() res: Response
  ) {

    
    return res.redirect(`${process.env.FB_URI}/${id}`)
  }

}
