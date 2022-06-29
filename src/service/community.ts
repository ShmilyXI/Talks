import request from "@/utils/request";
import { CommonReq, CommonRes } from "./";

// 获取最新讨论列表
const getArticleLatestList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/community/latest-list",
        method: "GET",
        data,
        // interceptors: {
        //   requestInterceptors(res) {
        //     console.log('接口请求拦截');

        //     return res;
        //   },
        //   responseInterceptors(result) {
        //     console.log('接口响应拦截');
        //     return result;
        //   },
        // },
    });
};

// 获取最高贡献成员列表
const getTopContributorList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/community/top-contributor-list",
        method: "GET",
        data,
    });
};

// 获取未被回复的讨论列表
const getUnansweredTalkList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/community/unanswered-talk-list",
        method: "GET",
        data,
    });
};

// 获取讨论详情
const getTalkDetailInfo = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/community/detail-info",
        method: "GET",
        data,
    });
};

export default {
    getTalkDetailInfo,
    getArticleLatestList,
    getTopContributorList,
    getUnansweredTalkList,
};
