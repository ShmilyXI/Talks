import { common } from './types';

export type CommentItem = {
  id: number;
  user_id: number;
  username: string;
  display_name: string;
  user_avatar_url: string;
  photo_id: number;
  content: string;
  likedStatus: number;
  liked_count: number;
  favoriteStatus: number;
  favorite_count: number;
  status: number;
  top_status: number;
  type: number;
  comment_level: number;
  parent_comment_id: number;
  parent_comment_user_id: number;
  reply_comment_id: number;
  reply_comment_user_id: number;
  create_time: string;
  replyUserInfo?: {
    id: number;
    username: string;
    display_name: string;
  };
  children?: CommentItem[];
};

export type CommentData = {
  content: string;
  commentLevel: 1 | 2;
  parentCommentId?: number;
  parentCommentUserId?: number;
  replyCommentId?: number;
  replyCommentUserId?: number;
};
export interface GetPhotoCommentListResponse extends common.Response {
  data: {
    list?: CommentItem[];
  };
}
export interface GetPhotoCommentListRequest {
  id: number;
}
export interface AddPhotoCommentResponse extends common.Response {
  data?: {
    id: number;
  };
}
export interface AddPhotoCommentRequest {
  photoId: number;
  content: string;
  commentLevel: number;
  type: number;
  parentCommentId?: number;
  parentCommentUserId?: number;
  replyCommentId?: number;
  replyCommentUserId?: number;
}
export interface DeletePhotoCommentResponse extends common.Response {
  data?: {
    id: number;
  };
}
export interface DeletePhotoCommentRequest {
  id?: number;
}
