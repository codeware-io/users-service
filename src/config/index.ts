import { ConfigObject } from '@nestjs/config';

export default (): ConfigObject => ({
  env: process.env?.NODE_ENV ?? 'development',
  port: +(process.env?.PORT || 4000),
  apiBase: process.env?.API_BASE ?? null,
  google: {
    clientID: process.env?.GOOGLE_CLIENT_ID ?? null,
    clientSecret: process.env?.GOOGLE_CLIENT_SECRET ?? null,
    scope: process.env?.GOOGLE_SCOPE.split(','),
  },
  facebook: {
    clientID: process.env?.FACEBOOK_CLIENT_ID ?? null,
    clientSecret: process.env?.FACEBOOK_CLIENT_SECRET ?? null,
    scope: process.env?.FACEBOOK_SCOPE.split(','),
  },
  jwt: {
    secret: process.env?.JWT_SECRET ?? null,
    refreshSecret: process.env?.JWT_REFRESH_SECRET ?? null,
    expires: process.env?.JWT_EXPIRES ?? null,
    refreshExpires: process.env?.JWT_REFRESH_EXPIRES ?? null,
    issuer: process.env?.JWT_ISSUER ?? null,
  },
});
