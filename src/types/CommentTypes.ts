import { common } from './types';

export interface CommentsAttributes {
  id: number;
  username: string;
  content: string;
  target_id: number;
  user_id: number;
  user_avatar_url?: string;
  parent_comment_id?: number;
  parent_comment_user_id?: number;
  reply_comment_id?: number;
  reply_comment_user_id?: number;
  comment_level: number;
  liked_count: number;
  is_delete: number;
  top_status: number;
  update_time: Date;
  create_time: Date;
}

export type CommentItem = {
  id: number;
  user_id: number;
  username: string;
  user_avatar_url?: string;
  target_id: number;
  parent_comment_id?: number;
  parent_comment_user_id?: number;
  reply_comment_id?: number;
  reply_comment_user_id?: number;
  content: string;
  comment_level: number;
  liked_count: number;
  status: number;
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
export interface GetCommentListResponse extends common.Response {
  data?: {
    list?: CommentItem[];
  };
}
export interface GetCommentListRequest {
  targetId: number;
  type: 'photo' | 'talk';
}
export interface AddCommentResponse extends common.Response {}
export interface AddCommentRequest {
  targetId: number;
  type: 'photo' | 'talk';
  content: string;
  commentLevel: number;
  parentCommentId?: number;
  parentCommentUserId?: number;
  replyCommentId?: number;
  replyCommentUserId?: number;
}
export interface DeleteCommentResponse extends common.Response {}
export interface DeleteCommentRequest {
  id?: number;
  type: 'photo' | 'talk';
  targetId?: number;
}
