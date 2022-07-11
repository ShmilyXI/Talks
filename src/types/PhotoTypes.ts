import { common } from './types';

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
  tags: string[];
  mood: string;
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
  tags: string;
  updateDate: string;
  authorName: string;
  avatarUrl: string;
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
