import { User } from './user.interface';

export interface SignInResponse {
  user: User;
  token: string;
}
