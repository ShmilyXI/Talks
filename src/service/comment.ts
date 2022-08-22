/* 评论 */
import {
  AddPhotoCommentRequest,
  AddPhotoCommentResponse,
  DeletePhotoCommentRequest,
  DeletePhotoCommentResponse,
  GetPhotoCommentListRequest,
  GetPhotoCommentListResponse,
} from "@/types/CommentTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";


const createApi = request.createApi({ baseURL: "/api" });

const commentApi = {
  /** 获取照片评论列表 **/
  getPhotoCommentList: createApi<
    GetPhotoCommentListResponse,
    RequestGetType<GetPhotoCommentListRequest>
  >({
    url: "/comment/get-photo-comment-list",
    method: "GET",
  }),
  /** 新增照片评论 **/
  addPhotoComment: createApi<
    AddPhotoCommentResponse,
    RequestPostType<AddPhotoCommentRequest>
  >({
    url: "/comment/add-photo-comment",
    method: "POST",
  }),
  /** 删除照片评论 **/
  deletePhotoComment: createApi<
    DeletePhotoCommentResponse,
    RequestPostType<DeletePhotoCommentRequest>
  >({
    url: "/comment/delete-photo-comment",
    method: "POST",
  }),
};

export default commentApi;
