import { common } from './types';

// model类型
export interface photosType {
  id: number;
  user_id: number;
  comment_id?: number;
  url: string;
  width: number;
  height: number;
  title: string;
  gallery_ids?: string;
  description?: string;
  theme_color?: string;
  place?: string;
  place_id?: string;
  location?: string;
  provincial_name?: string;
  city_name?: string;
  area_name?: string;
  tags?: string;
  mood?: string;
  show_comments: number;
  exif_brand?: string;
  exif_model?: string;
  exif_aperture?: string;
  exif_focal_length?: string;
  exif_shutter_speed?: string;
  exif_iso?: string;
  shooting_date: string;
  is_delete: number;
  create_time: Date;
  update_time: Date;
}


type ExifData = {
  brand: string;
  model: string;
  aperture: string;
  focalLength: string;
  shutterSpeed: string;
  iso: string;
};

export interface PhotoList extends photosType {
  likedStatus?: number;
  likedCount?: number;
  favoriteStatus?: number;
  favoriteCount?: number;
  commentCount?: number;
  user?: {
    display_name?: string;
    username?: string;
    telephone?: string;
    avatar_url?: string;
  };
}

export interface PhotoDetailInfoResponse extends common.Response {
  data?: { index: number; list: PhotoList[] };
}
export interface PhotoDetailInfoRequest {
  id: number;
}

export interface GetGalleryPhotoListResponse extends common.Response {
  data?: {
    list: PhotoList[];
    total: number;
  };
}
export interface GetGalleryPhotoListRequest {
  pageIndex: number;
  pageSize: number;
}
export interface UploadPhotoResponse extends common.Response {
  data?: {
    extname: string;
    fileName: string;
    height: number;
    imgUrl: string;
    themeColor: string;
    type: string;
    width: number;
    photoExifInfo?: ExifData;
  };
}

export interface IItem {
  label: string;
  value: string;
}
export interface PublishPhotoRequest {
  title: string;
  description?: string;
  url: string;
  width: number;
  height: number;
  galleryIds?: string;
  shootingDate: string;
  themeColor: string;
  mood: string;
  place: string;
  placeId: string;
  location: string;
  provincialName: string;
  showComments: boolean;
  cityName: string;
  areaName: string;
  tags: string[];
  photoExifInfo?: ExifData;
}
export interface PublishPhotoResponse extends common.Response {}
export interface UpdatePhotoRequest {
  id: number;
  title: string;
  description?: string;
  galleryIds?: string;
  shootingDate: string;
  mood: string;
  place: string;
  placeId: string;
  location: string;
  provincialName: string;
  showComments: boolean;
  cityName: string;
  areaName: string;
}
export interface UpdatePhotoResponse extends common.Response {}

export interface GetPhotoListByUserIdRequest {
  id: number;
}
export interface GetPhotoListByUserIdResponse extends common.Response {
  data?: {
    list: PhotoList[];
  };
}
