/* 评论 */

import { baseRequest } from ".";

const commentApi = {
  /** 获取评论列表 **/
  getCommentList: async (data = {}) => await baseRequest("/comment/get-comment-list", { method: "GET", data }),

  /** 新增评论 **/
  addComment: async (data = {}) => await baseRequest("/comment/add-comment", { method: "POST", data }),

  /** 删除评论 **/
  deleteComment: async (data = {}) => await baseRequest("/comment/delete-comment", { method: "POST", data }),
};

export default commentApi;
