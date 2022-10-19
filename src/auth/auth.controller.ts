import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyNames } from 'src/common/enums';

import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard(StrategyNames.Google))
  async googleSignIn(@Req() req) {
    return {
      status: 'success',
      message: 'You are already logged in!',
    };
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard(StrategyNames.Google))
  async googleCallback(@Req() req) {
    console.log('User', req.user);
    return this.service.googleSignIn(req);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard(StrategyNames.Facebook))
  async facebookSignIn(@Req() req) {
    return {
      status: 'success',
      message: 'You are already logged in!',
    };
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard(StrategyNames.Facebook))
  async facebookCallback(@Req() req) {
    console.log('User', req.user);
    return this.service.facebookSignIn(req);
  }
}
