import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { StrategyNames } from 'src/common/enums';
import { JwtTokens } from 'src/common/types';
import { UserDTO } from 'src/users/dto';

import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() user: UserDTO): Promise<JwtTokens> {
    return await this.service.signup(user);
  }

  @Get('/google')
  @UseGuards(AuthGuard(StrategyNames.Google))
  @HttpCode(HttpStatus.OK)
  async googleSignIn(@Req() req: Request) {
    return {
      status: 'success',
      message: 'You are already logged in!',
    };
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard(StrategyNames.Google))
  @HttpCode(HttpStatus.OK)
  async googleCallback(@Req() req: Request) {
    console.log('User', req.user);
    return this.service.googleSignIn(req);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard(StrategyNames.Facebook))
  @HttpCode(HttpStatus.OK)
  async facebookSignIn(@Req() req: Request) {
    return {
      status: 'success',
      message: 'You are already logged in!',
    };
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard(StrategyNames.Facebook))
  @HttpCode(HttpStatus.OK)
  async facebookCallback(@Req() req: Request) {
    console.log('User', req.user);
    return this.service.facebookSignIn(req);
  }
}
