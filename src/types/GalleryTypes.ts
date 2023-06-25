import { PhotoList } from "./PhotoTypes";
import { common } from "./types";

interface PhotoItem {
  id: number;
  url: string;
  width: number;
  height: number;
  theme_color: string;
  create_time: Date;
  update_time: Date;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  is_delete: 0 | 1;
  create_time: string;
  update_time: string;
  user_id: number;
  favoriteStatus: number;
  choice_type: number;
  photoList: PhotoItem[];
  user: {
    username: string;
    display_name: string;
    avatar_url: string;
    telephone: string;
  };
}

export interface GetGalleryListResponse extends common.Response {
  data?: { total: number; list: GalleryItem[] };
}
export interface GetGalleryListRequest {
  pageIndex: number;
  pageSize: number;
  type: string;
  user_id?: number | string;
}

export interface GetGalleryPhotoListResponse extends common.Response {
  data?: {
    list: GalleryItem[];
    total: number;
  };
}

export interface GetGalleryDetailResponse extends common.Response {
  data?: {
    id: number;
    title: string;
    description?: string;
    user_id: number;
    is_delete: number;
    update_time: Date;
    create_time: Date;
    favoriteStatus: number;
    user: PhotoList["user"];
    photoList: PhotoList[];
  };
}
export interface GetGalleryDetailRequest {
  id: number;
  type: string;
}
export interface AddGalleryRequest {
  user_id: number;
  title: string;
  description?: string;
}
export interface AddGalleryResponse extends common.Response {
  data?: string;
}

export interface UpdateGalleryRequest {
  id: number;
  title: string;
  description?: string;
}
export interface UpdateGalleryResponse extends common.Response {}
