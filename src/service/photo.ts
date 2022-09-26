/* 照片 */
import {
  GetPhotoListRequest,
  GetPhotoListResponse,
  GetPhotoListByUserIdRequest,
  GetPhotoListByUserIdResponse,
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
  /** 获取照片列表,根据用户id **/
  getPhotoListByUserId: createApi<GetPhotoListByUserIdResponse, RequestGetType<GetPhotoListByUserIdRequest>>({
    url: "/photo/get-photo-list-by-user-id",
    method: "GET",
  }),
  /** 上传照片 **/
  uploadPhoto: createApi<CommonRes, RequestPostType<UploadPhotoResponse>>({
    url: "/photo/upload-photo",
    method: "POST",
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
