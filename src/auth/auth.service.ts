import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtTokens } from 'src/common/types';
import { UserDTO } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signup(data: UserDTO): Promise<JwtTokens> {
    // find user or create one user using the user data
    const user = await this.userService.create(data);

    // create the access token and refresh token
    const tokens: JwtTokens = await this.tokens(user);

    // update the refresh token in the database
    await this.updateRefreshTokenInTheDatabase(
      tokens?.id,
      tokens?.refreshToken,
    );

    // return tokens
    return tokens;
  }

  async signin(data: UserDTO): Promise<JwtTokens> {
    // find the user
    const user = await this.userService.findUnique({ email: data?.email });

    // if user not found
    if (!user) throw new UnauthorizedException('Wrong email!');

    // verify the password
    if (!(await argon2.verify(user?.password, data?.password)))
      throw new UnauthorizedException('Wrong password!');

    // user exists so create tokens
    const tokens = await this.tokens(user);

    // now update the refresh token hash in the database
    await this.updateRefreshTokenInTheDatabase(user?.id, tokens?.refreshToken);

    return tokens;
  }

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
      message: 'User info from facebook',
      user: req?.user,
    };
  }

  /**
   * Create new tokens form the payload
   *
   * @param payload User - the user information to create the payload of the tokens
   *
   * @returns JWT tokens - access token & refresh token and additional information
   */
  async tokens(payload: Partial<User>): Promise<JwtTokens> {
    const expires = this.config.get<string>('jwt.expires');
    const refreshExpires = this.config.get<string>('jwt.refreshExpires');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: payload?.id,
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          email: payload.email,
        },
        {
          secret: this.config.get<string>('jwt.secret'),
          expiresIn: expires,
        },
      ),
      this.jwt.signAsync(
        {
          sub: payload?.id,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
        },
        {
          secret: this.config.get<string>('jwt.refreshSecret'),
          expiresIn: refreshExpires,
        },
      ),
    ]);

    return {
      id: payload?.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      accessToken: at,
      refreshToken: rt,
      accessExpire: expires,
      refreshExpires,
    } as JwtTokens;
  }

  /**
   * Add/update the refresh token to the database
   *
   * @param id number - user id for whom the token has been created
   *
   * @param refreshToken string - the refresh token of the user
   */
  async updateRefreshTokenInTheDatabase(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    // add the refresh token in the database with hashing by argon2
    await this.userService.update(
      { id },
      { refreshTokenHash: await argon2.hash(refreshToken) },
    );
  }
}
