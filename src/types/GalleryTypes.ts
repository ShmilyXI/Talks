import { common } from './types';

interface PhotoItem {
  id: number;
  url: string;
  width: number;
  height: number;
  theme_color: string;
  create_time: string;
  update_time: string;
}

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  is_delete: 0 | 1;
  create_time: string;
  update_time: string;
  user_id: number;
  photoList: PhotoItem[];
  user:{
    username: string;
    display_name: string;
    avatar_url: string;
    telephone: string;
  }
}

export interface GetGalleryListResponse extends common.Response {
  data?: { total: number; list: GalleryItem[] };
}
export interface GetGalleryListRequest {
  pageIndex: number;
  pageSize: number;
  type: string;
}

export interface GetGalleryPhotoListResponse extends common.Response {
  data?: {
    list: GalleryItem[];
    total: number;
  };
}

export interface GetGalleryDetailResponse extends common.Response {
}
export interface GetGalleryDetailRequest {
}
