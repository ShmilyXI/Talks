import { common } from './types';
export interface BaseUserInfo {
  id: string;
  username: string;
  telephone: string;
  place: string;
  place_id: string;
  location: string;
  provincial_name: string;
  city_name: string;
  area_name: string;
  avatar_url: string;
  create_time: string;
  update_time: string;
  last_login_date: string;
  display_name: string;
  email: string;
  individual_resume?: string;
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
  place: string;
  placeId: string;
  location: string;
  provincialName: string;
  cityName: string;
  areaName: string;
  individualResume?: string;
  userName: string;
}
export interface UpdateUserInfoResponse extends common.Response {
  data?: BaseUserInfo;
}

export interface UserLikedRequest {
  likedId: number;
  likedStatus: number;
  likedType: number;
}
export interface UserLikedResponse extends common.Response {
  data?: void;
}
export interface UserPhotoFavoriteRequest {
  photoId: number;
  favoriteStatus: number;
}
export interface UserPhotoFavoriteResponse extends common.Response {
  data?: void;
}
