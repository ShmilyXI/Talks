import request from '@/utils/request';

type CommonReq = any;
type CommonRes = any;

// 获取最新文章列表
const getArticleLatestList = (data: CommonReq) => {
  return request<CommonReq, CommonRes>({
    url: '/article/latest-list',
    method: 'GET',
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
    url: '/article/top-contributor-list',
    method: 'GET',
    data,
  });
};

// 获取未被回复的文章列表
const getUnansweredTalkList = (data: CommonReq) => {
  return request<CommonReq, CommonRes>({
    url: '/article/unanswered-talk-list',
    method: 'GET',
    data,
  });
};
// 获取未被回复的文章列表
const getGalleryPhotoList = (data: CommonReq) => {
  return request<CommonReq, CommonRes>({
    url: '/browse/gallery-photo-list',
    method: 'POST',
    data,
  });
};

const Api = {
  getArticleLatestList,
  getTopContributorList,
  getUnansweredTalkList,
  getGalleryPhotoList
};

export default Api;
