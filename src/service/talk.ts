/* 社区 */

import { baseRequest } from ".";

const talkApi = {
  /** 获取讨论列表 **/
  getTalkList: async (data = {}) => await baseRequest.Http("/talk/get-talk-list", { method: "POST", data }),

  /** 获取讨论详情 **/
  getTalkDetailInfo: async (data = {}) => await baseRequest.Http("/talk/get-detail-info", { method: "GET", data }),

  /** 获取杰出贡献者列表 **/
  getOutstandingContributors: async (data = {}) => await baseRequest.Http("/talk/get-outstanding-contributors", { method: "GET", data }),

  /** 获取未答复讨论列表 **/
  getUnansweredList: async (data = {}) => await baseRequest.Http("/talk/get-unanswered-list", { method: "GET", data }),

  /** 上传图片 **/
  uploadImage: async (data = {}) => await baseRequest.Http("/talk/upload-image", { method: "POST", data }),

  /** 新增讨论 **/
  addTalk: async (data = {}) => await baseRequest.Http("/talk/add-talk", { method: "POST", data }),

  /** 编辑讨论 **/
  updateTalk: async (data = {}) => await baseRequest.Http("/talk/update-talk", { method: "POST", data }),
};

export default talkApi;
