import { common } from "./types";

type ExifData = {
  brand: string;
  model: string;
  aperture: string;
  focalLength: string;
  shutterSpeed: string;
  iso: string;
};
export interface BasePhotoInfo {
  id: number;
  userId: string;
  authorName: string;
  avatarUrl: string;
  commentId: number;
  galleryId: number;
  url: string;
  width: number;
  height: number;
  title: string;
  description: string;
  viewCount: number;
  themeColor: string;
  place: string;
  placeId: string;
  location: string;
  provincialName:  string;
  cityName: string;
  areaName: string;
  tags: string[];
  mood: string;
  likedStatus: number;
  exifData: ExifData;
  createDate: string;
  updateDate: string;
}

export interface PhotoDetailInfoResponse extends common.Response {
  data?: { index: number; list: BasePhotoInfo[] };
}
export interface PhotoDetailInfoRequest {
  id: string | number;
}

export interface GalleryPhotoItem {
  id: number;
  userId: string;
  commentId: number;
  galleryId: number;
  url: string;
  width: number;
  height: number;
  title: string;
  description: string;
  viewCount: number;
  themeColor: string;
  place: string;
  placeId: string;
  location: string;
  provincialName:  string;
  cityName: string;
  areaName: string;
  tags: string;
  updateDate: string;
  authorName: string;
  avatarUrl: string;
  commentCount: number;
  likedStatus: number;
  liked_count: number;
}
export interface GetGalleryPhotoListResponse extends common.Response {
  data?: {
    list: GalleryPhotoItem[];
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
  galleryList?: number[];
  shootingDate: string;
  themeColor: string;
  mood: string;
  place: string;
  placeId: string;
  location: string;
  provincialName:  string;
  cityName: string;
  areaName: string;
  tags: string[];
  photoExifInfo?: ExifData;
}
export interface PublishPhotoResponse extends common.Response {
  data?: {
    id: string;
  };
}

export interface GetPhotoListByUserIdRequest {
  id: number;
}
export interface GetPhotoListByUserIdResponse extends common.Response {
  data?: {
    list: GalleryPhotoItem[];
  };
}
