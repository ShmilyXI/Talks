import {
  UserLoginResponse,
  UserLoginRequest,
  UserRegisterResponse,
  UserRegisterRequest,
  GetUserInfoResponse,
  GetUserInfoRequest,
} from "@/types/UserTypes";
import request, {
  HttpJson,
  RequestGetType,
  RequestPostType,
} from "@/utils/request";

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
};

export default userApi;
