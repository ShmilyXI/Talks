import { common } from './types';
export interface BaseUserInfo {
  id: string;
  name: string;
  telephone: string;
  avatar_url: string;
  create_date: string;
  update_date: string;
  last_login_date: string;
}

export interface GetUserInfoRequest {
  id?: string;
}
export interface GetUserInfoResponse extends common.Response {
  data?: BaseUserInfo;
}
export interface UserRegisterRequest {
  name: string;
  telephone: string;
  password: string;
}
export interface UserRegisterResponse extends common.Response {}

export interface UserLoginRequest {
  telephone: string;
  password: string;
}
export interface UserLoginResponse extends common.Response {
  token?: string;
  data?: {
    id: string;
  };
}
