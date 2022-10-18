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
});
