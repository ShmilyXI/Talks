import { CommentItem } from './CommentTypes';
import { common } from './types';

export interface talk_commentsAttributes {
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

export interface TalkItem {
  id: number;
  user_id: number;
  title: string;
  content: string;
  is_unanswered: number;
  is_featured?: number;
  is_delete: number;
  update_time: Date;
  create_time: Date;
  user?: {
    display_name?: string;
    telephone?: string;
    avatar_url?: string;
  };
  commentCount?: number;
  commentList?: talk_commentsAttributes[] | CommentItem[];
}

export interface GetTalkLitResponse extends common.Response {
  data?: {
    list: TalkItem[];
    total: number;
  };
}

export interface GetTalkLitRequest {
  pageIndex: number;
  pageSize: number;
  type: string;
}

export interface GetDetailInfoResponse extends common.Response {
  data?: TalkItem;
}

export interface GetDetailInfoRequest {
  id: number;
}

export interface AddTalkResponse extends common.Response {}

export interface AddTalkRequest {
  title: string;
  content: string;
}

export interface UpdateTalkResponse extends common.Response {}

export interface UpdateTalkRequest {
  id: number;
  title: string;
  content: string;
}
