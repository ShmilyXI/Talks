/* 社区 */
import {} from "@/types/TalkTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";
import { CommonReq, CommonRes } from ".";

const createApi = request.createApi({ baseURL: "/api" });

const talkApi = {
  /** 获取讨论列表 **/
  getTalkList: createApi<any, RequestPostType<any>>({
    url: "/talk/get-talk-list",
    method: "POST",
  }),
  /** 获取讨论详情 **/
  getTalkDetailInfo: createApi<any, RequestGetType<any>>({
    url: "/talk/get-detail-info",
    method: "GET",
  }),
  /** 新增讨论 **/
  addTalk: createApi<CommonRes, RequestPostType<any>>({
    url: "/talk/upload-talk",
    method: "POST",
  }),
  /** 编辑讨论 **/
  updateTalk: createApi<any, RequestPostType<any>>({
    url: "/talk/update-talk",
    method: "POST",
  }),
};

export default talkApi;
