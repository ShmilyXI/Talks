/* 照片 */
import {
  GetGalleryListRequest,
  GetGalleryListResponse,
  GetGalleryDetailRequest,
  GetGalleryDetailResponse,
} from "@/types/GalleryTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";
import { CommonReq, CommonRes } from ".";

const createApi = request.createApi({ baseURL: "/api" });

const galleryApi = {
  /** 获取画廊列表 **/
  getGalleryList: createApi<GetGalleryListResponse, RequestPostType<GetGalleryListRequest>>({
    url: "/gallery/gallery-list",
    method: "POST",
  }),
  /** 获取画廊详情 **/
  getGalleryDetail: createApi<GetGalleryDetailResponse, RequestGetType<GetGalleryDetailRequest>>({
    url: "/gallery/get-detail",
    method: "GET",
  }),
};

export default galleryApi;
