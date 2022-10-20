import { Request } from 'express';

import { JWT } from '../types';

/**
 * Include the jwt payload with the request data
 */
export interface JwtRequest extends Request {
  jwt?: JWT;
}
