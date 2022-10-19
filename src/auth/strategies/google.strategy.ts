import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { StrategyNames } from 'src/common/enums';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
  Strategy,
  StrategyNames.Google,
) {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('google.clientID'),
      clientSecret: config.get<string>('google.clientSecret'),
      callbackURL: `${config.get<string>('apiBase')}/auth/google/callback`,
      scope: config.get<string[]>('google.scope'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(profile);
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
