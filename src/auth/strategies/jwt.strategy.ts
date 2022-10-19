import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StrategyNames } from 'src/common/enums';

import { JWT } from 'src/common/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyNames.JWT) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('jwt.secret'),
      // issuer: config.get<string>('jqt.issuer'),  // todo: add this in production
    });
  }

  validate(payload: JWT): JWT {
    return payload;
  }
}
