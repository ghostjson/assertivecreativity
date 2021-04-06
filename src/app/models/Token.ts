import { User } from './User';

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface ParsedToken {
  exp: number;
  iat: number;
  nbf: number;
  iss: string;
  jti: string;
  prv: string;
  sub: number;
}
