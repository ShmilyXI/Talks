/* 照片 */

import { baseRequest } from ".";

const galleryApi = {
  /** 获取画廊列表 **/
  getGalleryList: async (data = {}) => await baseRequest("/gallery/gallery-list", { method: "POST", data }),

  /** 获取画廊详情 **/
  getGalleryDetail: async (data = {}) => await baseRequest("/gallery/get-detail", { method: "GET", data }),

  /** 编辑画廊 **/
  updateGallery: async (data = {}) => await baseRequest("/gallery/update", { method: "POST", data }),
};

export default galleryApi;
