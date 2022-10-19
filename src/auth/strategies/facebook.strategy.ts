import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { StrategyNames } from 'src/common/enums';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  StrategyNames.Facebook,
) {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('facebook.clientID'),
      clientSecret: config.get<string>('facebook.clientSecret'),
      callbackURL: `${config.get<string>('apiBase')}/auth/facebook/callback`,
      scope: config.get<string[]>('facebook.scope'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    console.log(profile);
    const { name, emails } = profile;

    const user = {
      email: emails?.[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
