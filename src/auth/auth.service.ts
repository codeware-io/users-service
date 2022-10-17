import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async googleSignIn(req) {
    return {
      message: 'User info from google',
      user: req?.user,
    };
  }
}
