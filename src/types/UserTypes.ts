import { common } from "./types";

export interface user_favoritesAttributes {
  id: number;
  user_id: number;
  favorite_id: number;
  favorite_status: number;
  favorite_type: number;
  is_delete: number;
  update_time: Date;
  create_time: Date;
}

export interface user_likesAttributes {
  id: number;
  user_id: number;
  liked_id: number;
  liked_status: number;
  liked_type: number;
  is_delete: number;
  update_time: Date;
  create_time: Date;
}
export interface BaseUserInfo {
  id: number;
  username: string;
  display_name: string;
  telephone: string;
  password: string;
  avatar_url?: string;
  email?: string;
  individual_resume?: string;
  place?: string;
  location?: string;
  place_id?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  is_delete: number;
  last_login_date?: Date;
  update_time: Date;
  create_time: Date;
}

export interface GetUserInfoRequest {
  id?: number;
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
    id: number;
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
  data?: user_likesAttributes;
}
export interface UserFavoriteRequest {
  favoriteId: number;
  favoriteStatus: number;
  favoriteType: number;
}
export interface UserFavoriteResponse extends common.Response {
  data?: user_favoritesAttributes;
}
