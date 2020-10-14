import { User } from './User';

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}