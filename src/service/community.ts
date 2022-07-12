import {
  GetArticleLatestListResponse,
  GetArticleLatestListRequest,
  GetTopContributorListResponse,
  GetTopContributorListRequest,
  GetUnansweredTalkListResponse,
  GetUnansweredTalkListRequest,
  GetTalkDetailInfoResponse,
  GetTalkDetailInfoRequest,
} from "@/types/CommunityTypes";
import request, { RequestGetType, RequestPostType } from "@/utils/request";
import { CommonReq, CommonRes } from "./";

const createApi = request.createApi({ baseURL: "/api" });

const communityApi = {
  /** 获取最新讨论列表 **/
  getArticleLatestList: createApi<
    GetArticleLatestListResponse,
    RequestGetType<GetArticleLatestListRequest>
  >({
    url: "/community/latest-list",
    method: "GET",
  }),
  /** 获取最高贡献成员列表 **/
  getTopContributorList: createApi<
    GetTopContributorListResponse,
    RequestGetType<GetTopContributorListRequest>
  >({
    url: "/community/top-contributor-list",
    method: "GET",
  }),
  /** 获取未被回复的讨论列表 **/
  getUnansweredTalkList: createApi<
    GetUnansweredTalkListResponse,
    RequestGetType<GetUnansweredTalkListRequest>
  >({
    url: "/community/unanswered-talk-list",
    method: "GET",
  }),
  /** 获取讨论详情 **/
  getTalkDetailInfo: createApi<
    GetTalkDetailInfoResponse,
    RequestGetType<GetTalkDetailInfoRequest>
  >({
    url: "/community/detail-info",
    method: "GET",
  }),
};

export default communityApi;
