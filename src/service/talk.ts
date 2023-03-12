/* 社区 */
import * as TalkTypes from "@/types/TalkTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";
import { CommonReq, CommonRes } from ".";

const createApi = request.createApi({ baseURL: "/api" });

const talkApi = {
  /** 获取讨论列表 **/
  getTalkList: createApi<TalkTypes.GetTalkLitResponse, RequestPostType<TalkTypes.GetTalkLitRequest>>({
    url: "/talk/get-talk-list",
    method: "POST",
  }),
  /** 获取讨论详情 **/
  getTalkDetailInfo: createApi<TalkTypes.GetDetailInfoResponse, RequestGetType<TalkTypes.GetDetailInfoRequest>>({
    url: "/talk/get-detail-info",
    method: "GET",
  }),
  /** 获取杰出贡献者列表 **/
  getOutstandingContributors: createApi<TalkTypes.GetOutstandingContributorsResponse, RequestGetType<CommonReq>>({
    url: "/talk/get-outstanding-contributors",
    method: "GET",
  }),
  /** 获取未答复讨论列表 **/
  getUnansweredList: createApi<TalkTypes.GetUnansweredListResponse, RequestGetType<CommonReq>>({
    url: "/talk/get-unanswered-list",
    method: "GET",
  }),
  /** 上传图片 **/
  uploadImage: createApi<TalkTypes.UploadImageResponse, RequestPostType<CommonReq>>({
    url: "/talk/upload-image",
    method: "POST",
  }),
  /** 新增讨论 **/
  addTalk: createApi<TalkTypes.AddTalkResponse, RequestPostType<TalkTypes.AddTalkRequest>>({
    url: "/talk/add-talk",
    method: "POST",
  }),
  /** 编辑讨论 **/
  updateTalk: createApi<TalkTypes.UpdateTalkResponse, RequestPostType<TalkTypes.UpdateTalkRequest>>({
    url: "/talk/update-talk",
    method: "POST",
  }),
};

export default talkApi;
