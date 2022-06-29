import request from "@/utils/request";
import { CommonReq, CommonRes } from ".";

// 获取画廊图片列表
const getGalleryPhotoList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/photo/gallery-photo-list",
        method: "POST",
        data,
    });
};

// 获取画廊图片详情
const getPhotoDetailInfo = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/photo/photo-detail-info",
        method: "GET",
        data,
    });
};

// 获取画廊图片评论列表
const getPhotoDetailComments = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/photo/photo-detail-comments",
        method: "GET",
        data,
    });
};
// 获取画廊里程碑成员列表
const getPhotoMilestoneList = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/photo/photo-milestone-list",
        method: "GET",
        data,
    });
};

export default {
    getGalleryPhotoList,
    getPhotoDetailInfo,
    getPhotoDetailComments,
    getPhotoMilestoneList,
};
