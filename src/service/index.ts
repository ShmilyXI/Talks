import request from '@/utils/request';

type CommonReq = any;
type CommonRes = any;

const getArticleLatestList = (data: CommonReq) => {
  console.log('data', data);
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

const Api = {
  getArticleLatestList,
};

export default Api;
