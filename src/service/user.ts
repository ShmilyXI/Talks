/* 用户 */

import { baseRequest } from ".";

const userApi = {
  /** 登录 **/
  userLogin: async (data = {}) => await baseRequest.Http("/user/login", { method: "POST", data }),

  /** 注册 **/
  userRegister: async (data = {}) => await baseRequest.Http("/user/register", { method: "POST", data }),

  /** 获取用户信息 **/
  getUserInfo: async (params = {}) => await baseRequest.Http("/user/get-user-info", { method: "GET", params }),

  /** 上传头像 **/
  uploadAvatar: async (data = {}) => await baseRequest.Http("/user/upload-avatar", { method: "POST", data }),

  /** 更新用户信息 **/
  updateUserInfo: async (data = {}) => await baseRequest.Http("/user/update-user-info", { method: "POST", data }),

  /** 用户点赞 **/
  userLiked: async (data = {}) => await baseRequest.Http("/user/user-liked", { method: "POST", data }),

  /** 用户收藏 **/
  userPhotoFavorite: async (data = {}) => await baseRequest.Http("/user/user-photo-favorite", { method: "POST", data }),
};

export default userApi;
