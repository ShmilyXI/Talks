/* 照片 */

import { baseRequest } from ".";

const galleryApi = {
  /** 获取画廊列表 **/
  getGalleryList: async (data = {}) => await baseRequest("/gallery/gallery-list", { method: "POST", data }),

  /** 获取画廊详情 **/
  getGalleryDetail: async (params = {}) => await baseRequest("/gallery/get-detail", { method: "GET", params }),

  /** 编辑画廊 **/
  updateGallery: async (data = {}) => await baseRequest("/gallery/update", { method: "POST", data }),

  /** 新增画廊 **/
  addGallery: async (data = {}) => await baseRequest("/gallery/add", { method: "POST", data }),

  /** 删除画廊 **/
  deleteGallery: async (data = {}) => await baseRequest("/gallery/delete", { method: "POST", data }),
};

export default galleryApi;
