/* 评论 */
import {
  AddCommentRequest,
  AddCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  GetCommentListRequest,
  GetCommentListResponse,
} from "@/types/CommentTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";


const createApi = request.createApi({ baseURL: "/api" });

const commentApi = {
  /** 获取评论列表 **/
  getCommentList: createApi<
    GetCommentListResponse,
    RequestGetType<GetCommentListRequest>
  >({
    url: "/comment/get-comment-list",
    method: "GET",
  }),
  /** 新增评论 **/
  addComment: createApi<
    AddCommentResponse,
    RequestPostType<AddCommentRequest>
  >({
    url: "/comment/add-comment",
    method: "POST",
  }),
  /** 删除评论 **/
  deleteComment: createApi<
    DeleteCommentResponse,
    RequestPostType<DeleteCommentRequest>
  >({
    url: "/comment/delete-comment",
    method: "POST",
  }),
};

export default commentApi;
