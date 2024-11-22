import { baseRequest } from ".";

/* 照片 */
const photoApi = {
  /** 获取画廊图片列表 **/
  getGalleryPhotoList: async (data = {}) => await baseRequest("/photo/get-photo-list", { method: "POST", data }),

  /** 获取画廊图片详情 **/
  getPhotoDetailInfo: async (data = {}) => await baseRequest("/photo/photo-detail-info", { method: "GET", data }),

  /** 获取用户照片列表 **/
  getUserPhotoList: async (data = {}) => await baseRequest("/photo/get-user-photo-list", { method: "GET", data }),

  /** 上传照片 **/
  uploadPhoto: async (data = {}) => await baseRequest("/photo/upload-photo", { method: "POST", data, headers: { "Content-Type": "multipart/form-data" } }),

  /** 发布照片 **/
  publishPhoto: async (data = {}) => await baseRequest("/photo/publish-photo", { method: "POST", data }),

  /** 编辑照片 **/
  updatePhoto: async (data = {}) => await baseRequest("/photo/update-photo", { method: "POST", data, headers: { "Content-Type": "multipart/form-data" } }),

  /** 获取画廊图片评论列表 **/
  getPhotoDetailComments: async (data = {}) => await baseRequest("/photo/photo-detail-comments", { method: "GET", data }),

  /** 获取画廊里程碑成员列表 **/
  getPhotoMilestoneList: async (data = {}) => await baseRequest("/photo/photo-milestone-list", { method: "GET", data }),
};

export default photoApi;
