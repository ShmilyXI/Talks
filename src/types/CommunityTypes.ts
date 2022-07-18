import { common } from "./types";

export type CommentItem = {
  user_id: number;
  username: string;
  display_name: string;
  user_avatar_url: string;
  photo_id: number;
  content: string;
  create_date: string;
  like_count: number;
  status: number;
  top_status: number;
  type: number;
  comment_level: number;
  id: number;
  parent_comment_id: number;
  parent_comment_user_id: number;
  reply_comment_id: number;
  reply_comment_user_id: number;
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
export interface GetArticleLatestListResponse extends common.Response {}
export interface GetArticleLatestListRequest {}
