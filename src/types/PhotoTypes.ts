import { GalleryItem } from './GalleryTypes';
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
  comment_count: number;
  liked_count: number;
  favorite_count: number;
  shooting_date: string;
  is_delete: number;
  create_time: Date;
  update_time: Date;
}

type ExifData = {
  brand: string;
  model: string;
  aperture: string | number;
  focalLength: string;
  shutterSpeed: string;
  iso: string | number;
  exposureDifference: string;
  lensModel: string;
};

export interface PhotoList extends photosType {
  likedStatus?: number;
  favoriteStatus?: number;
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

export interface GetPhotoListResponse extends common.Response {
  data?: {
    list: PhotoList[];
    total: number;
  };
}
export interface GetPhotoListRequest {
  pageIndex: number;
  pageSize: number;
  type: string;
}
export interface UploadPhotoResponse extends common.Response {
  data?: {
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
  title: string; // 标题
  type: 'photo' | 'gallery'; // 类型
  description?: string; // 描述
  gallery?: number[]; // 画廊列表
  newGalleryList?: Partial<GalleryItem>[]; // 新建画廊列表
  // mood: string; // 心情
  place: string; // 地点
  placeId: string; // 地点id
  location: string; // 经纬度
  provincialName: string; // 省份
  cityName: string; // 城市
  areaName: string; // 区域
  // tags: string[]; // 标签
  showComments: boolean; // 是否显示评论
  shootingDate: string; // 拍摄日期
  photosData: {
    imgUrl: string; // 图片地址
    width: number; // 图片宽度
    height: number; // 图片高度
    themeColor: string; // 主题色
    photoExifInfo?: ExifData; // 图片exif信息
    type: string; // 图片类型
  }[];
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

export interface GetUserPhotoListRequest {
  id: number;
}
export interface GetUserPhotoListResponse extends common.Response {
  data?: {
    list: PhotoList[];
  };
}

export interface QiniuUploadResponse {
  mimeType: string;
  width: string;
  height: string;
  key: string;
}
