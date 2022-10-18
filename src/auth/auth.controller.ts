import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleSignIn(@Req() req) {
    return {
      status: 'success',
      message: 'You are already logged in!',
    };
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    console.log('User', req.user);
    return this.service.googleSignIn(req);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookSignIn(@Req() req) {
    return {
      status: 'success',
      message: 'You are already logged in!',
    };
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Req() req) {
    console.log('User', req.user);
    return this.service.facebookSignIn(req);
  }
}
