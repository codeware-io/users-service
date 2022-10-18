import { Request } from 'express';

/**
 * The type of the payload of the jwt token
 */
export type JWT = {
  jti: string; // JWT id
  iss?: string; // issuer
  sub: number; // user id
  email: string; // user email
  iat?: number; // issued at
  exp?: number; // expires in
  nbf?: number; // not before
  refreshToken?: string; // refresh token
};

/**
 * Type for the jwt token response
 */
export type JwtTokens = {
  id: number;
  name: string;
  access_token: string;
  access_expire: string;
  refresh_token: string;
  refresh_expire: string;
};

/**
 * Include the jwt payload with the request data
 */
export interface JwtRequest extends Request {
  jwt?: JWT;
}
