/* 照片 */
import {
  GetPhotoListRequest,
  GetPhotoListResponse,
  GetUserPhotoListRequest,
  GetUserPhotoListResponse,
  PhotoDetailInfoRequest,
  PhotoDetailInfoResponse,
  PublishPhotoRequest,
  PublishPhotoResponse,
  UpdatePhotoRequest,
  UpdatePhotoResponse,
  UploadPhotoResponse,
} from "@/types/PhotoTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";
import { CommonReq, CommonRes } from "./";

const createApi = request.createApi({ baseURL: "/api" });

const photoApi = {
  /** 获取画廊图片列表 **/
  getGalleryPhotoList: createApi<GetPhotoListResponse, RequestPostType<GetPhotoListRequest>>({
    url: "/photo/get-photo-list",
    method: "POST",
  }),
  /** 获取画廊图片详情 **/
  getPhotoDetailInfo: createApi<PhotoDetailInfoResponse, RequestGetType<PhotoDetailInfoRequest>>({
    url: "/photo/photo-detail-info",
    method: "GET",
  }),
  /** 获取用户照片列表 **/
  getUserPhotoList: createApi<GetUserPhotoListResponse, RequestGetType<GetUserPhotoListRequest>>({
    url: "/photo/get-user-photo-list",
    method: "GET",
  }),
  /** 上传照片 **/
  uploadPhoto: createApi<CommonRes, RequestPostType<UploadPhotoResponse>>({
    url: "/photo/upload-photo",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  /** 发布照片 **/
  publishPhoto: createApi<PublishPhotoResponse, RequestPostType<PublishPhotoRequest>>({
    url: "/photo/publish-photo",
    method: "POST",
  }),
  /** 编辑照片 **/
  updatePhoto: createApi<UpdatePhotoResponse, RequestPostType<UpdatePhotoRequest>>({
    url: "/photo/update-photo",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  /** 获取画廊图片评论列表 **/
  getPhotoDetailComments: createApi<CommonRes, RequestGetType<CommonReq>>({
    url: "/photo/photo-detail-comments",
    method: "GET",
  }),
  /** 获取画廊里程碑成员列表 **/
  getPhotoMilestoneList: createApi<CommonRes, RequestGetType<CommonReq>>({
    url: "/photo/photo-milestone-list",
    method: "GET",
  }),
};

export default photoApi;
