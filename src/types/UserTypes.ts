import { common } from './types';
export interface BaseUserInfo {
  id: string;
  username: string;
  telephone: string;
  avatar_url: string;
  create_date: string;
  update_date: string;
  last_login_date: string;
  display_name: string;
  email: string;
  individual_resume?: string;
  location?: string;
}

export interface GetUserInfoRequest {
  id?: string;
}
export interface GetUserInfoResponse extends common.Response {
  data?: BaseUserInfo;
}
export interface UserRegisterRequest {
  username: string;
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
export interface UploadAvatarResponse extends common.Response {
  data?: string;
}

export interface UpdateUserInfoRequest {
  avatarUrl: string;
  displayName: string;
  email: string;
  individualResume?: string;
  location?: string;
  userName: string;
}
export interface UpdateUserInfoResponse extends common.Response {
  data?: BaseUserInfo;
}
