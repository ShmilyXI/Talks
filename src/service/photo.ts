import {
  GetGalleryPhotoListRequest,
  GetGalleryPhotoListResponse,
  PhotoDetailInfoRequest,
  PhotoDetailInfoResponse,
} from "@/types/PhotoTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";
import { CommonReq, CommonRes } from ".";

const createApi = request.createApi({ baseURL: "/api" });

const photoApi = {
  /** 获取画廊图片列表 **/
  getGalleryPhotoList: createApi<
    GetGalleryPhotoListResponse,
    RequestPostType<GetGalleryPhotoListRequest>
  >({
    url: "/photo/gallery-photo-list",
    method: "POST",
  }),
  /** 获取画廊图片详情 **/
  getPhotoDetailInfo: createApi<
    PhotoDetailInfoResponse,
    RequestGetType<PhotoDetailInfoRequest>
  >({
    url: "/photo/photo-detail-info",
    method: "GET",
  }),
  /** 上传图片 **/
  uploadPhoto: createApi<CommonRes, RequestPostType<CommonReq>>({
    url: "/photo/upload-photo",
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
