import {} from "@/types/PhotoTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";
import { CommonReq, CommonRes } from "./";

const createApi = request.createApi({ baseURL: "/api" });

const commentApi = {
  /** 获取照片评论列表 **/
  getPhotoCommentList: createApi<any, RequestGetType<any>>({
    url: "/comment/get-photo-comment-list",
    method: "GET",
  }),
  /** 新增照片评论 **/
  addPhotoComment: createApi<any, RequestPostType<any>>({
    url: "/comment/add-photo-comment",
    method: "POST",
  }),
};

export default commentApi;
