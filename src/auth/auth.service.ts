import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async googleSignIn(req) {
    // after getting this create user in the database
    // create JWT for subsequent requests
    // return the JWT and other user information that will be needed in the client
    return {
      message: 'User info from google',
      user: req?.user,
    };
  }

  async facebookSignIn(req) {
    // after getting this create user in the database
    // create JWT for subsequent requests
    // return the JWT and other user information that will be needed in the client
    return {
      message: 'User info from google',
      user: req?.user,
    };
  }
}
