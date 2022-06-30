import { common } from './types';
export interface BaseUserInfo {
  id: number;
  name: string;
  telephone: string;
  avatar_url: string;
  create_date: string;
  update_date: string;
  last_login_date: string;
}

export interface GetUserInfoRequest {
  id: number;
}
export interface GetUserInfoResponse extends common.Response {
  data?: BaseUserInfo;
}
export interface RegisterRequest {
  name: string;
  telephone: string;
  password: string;
}
export interface RegisterResponse extends common.Response {}

export interface LoginRequest {
  telephone: string;
  password: string;
}
export interface LoginResponse extends common.Response {
  token?: string;
}
