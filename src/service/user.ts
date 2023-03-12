/* 用户 */
import {
  UserLoginResponse,
  UserLoginRequest,
  UserRegisterResponse,
  UserRegisterRequest,
  GetUserInfoResponse,
  GetUserInfoRequest,
  UpdateUserInfoResponse,
  UpdateUserInfoRequest,
  UploadAvatarResponse,
  UserLikedRequest,
  UserLikedResponse,
  UserFavoriteResponse,
  UserFavoriteRequest
} from "@/types/UserTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";

import { CommonRes } from ".";

const createApi = request.createApi({ baseURL: "/api" });

const userApi = {
  /** 登录 **/
  userLogin: createApi<UserLoginResponse, RequestPostType<UserLoginRequest>>({
    url: "/user/login",
    method: "POST",
  }),
  /** 注册 **/
  userRegister: createApi<
    UserRegisterResponse,
    RequestPostType<UserRegisterRequest>
  >({
    url: "/user/register",
    method: "POST",
  }),
  /** 获取用户信息 **/
  getUserInfo: createApi<
    GetUserInfoResponse,
    RequestGetType<GetUserInfoRequest>
  >({
    url: "/user/get-user-info",
    method: "GET",
  }),
  /** 上传头像 **/
  uploadAvatar: createApi<CommonRes, RequestPostType<UploadAvatarResponse>>({
    url: "/user/upload-avatar",
    method: "POST",
  }),
  /** 更新用户信息 **/
  updateUserInfo: createApi<
    UpdateUserInfoResponse,
    RequestPostType<UpdateUserInfoRequest>
  >({
    url: "/user/update-user-info",
    method: "POST",
  }),
  /** 用户点赞 **/
  userLiked: createApi<
    UserLikedResponse,
    RequestPostType<UserLikedRequest>
  >({
    url: "/user/user-liked",
    method: "POST",
  }),
  /** 用户收藏 **/
  userPhotoFavorite: createApi<
    UserFavoriteResponse,
    RequestPostType<UserFavoriteRequest>
  >({
    url: "/user/user-photo-favorite",
    method: "POST",
  }),
};

export default userApi;
