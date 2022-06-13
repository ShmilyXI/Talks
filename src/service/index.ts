import request from "@/utils/request";

type CommonReq = any;
type CommonRes = any;

// 获取最新讨论列表
const getArticleLatestList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/talk/latest-list",
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
        url: "/talk/top-contributor-list",
        method: "GET",
        data,
    });
};

// 获取未被回复的讨论列表
const getUnansweredTalkList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/talk/unanswered-talk-list",
        method: "GET",
        data,
    });
};

// 获取讨论详情
const getTalkDetailInfo = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/talk/detail-info",
        method: "GET",
        data,
    });
};

// 获取画廊图片列表
const getGalleryPhotoList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/browse/gallery-photo-list",
        method: "POST",
        data,
    });
};

// 获取画廊图片详情
const getPhotoDetailInfo = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/browse/photo-detail-info",
        method: "GET",
        data,
    });
};

// 获取画廊图片评论列表
const getPhotoDetailComments = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/browse/photo-detail-comments",
        method: "GET",
        data,
    });
};
// 获取画廊里程碑成员列表
const getPhotoMilestoneList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/browse/photo-milestone-list",
        method: "GET",
        data,
    });
};

const Api = {
    getTalkDetailInfo,
    getArticleLatestList,
    getTopContributorList,
    getUnansweredTalkList,
    getGalleryPhotoList,
    getPhotoDetailInfo,
    getPhotoDetailComments,
    getPhotoMilestoneList
};

export default Api;
