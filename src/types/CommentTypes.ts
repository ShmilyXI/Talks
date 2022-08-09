import { common } from './types';

export type CommentItem = {
  id: number;
  user_id: number;
  username: string;
  user_avatar_url?: string;
  photo_id: number;
  parent_comment_id?: number;
  parent_comment_user_id?: number;
  reply_comment_id?: number;
  reply_comment_user_id?: number;
  content: string;
  comment_level: number;
  liked_count: number;
  status: number;
  type: number;
  is_delete: number;
  top_status: number;
  update_time: Date;
  create_time: Date;
  likedStatus: number;
  user: {
    display_name: string;
  };
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
export interface AddPhotoCommentResponse extends common.Response {}
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
export interface DeletePhotoCommentResponse extends common.Response {}
export interface DeletePhotoCommentRequest {
  id?: number;
  photoId?: number;
}
