### trade-request

相关文档：
- [axios](https://axios-http.com/)

```ts
import {
  AxiosRequestConfig,
  createRequest,
  formDataMiddleware,
  FormDataOption,
  loadingMiddleware,
  LoadingOption,
  requestIdMiddleware,
  SerializedError,
  serializedErrorMiddleware,
  serializedResponseMiddleware,
  showErrorMiddleware,
  ShowErrorOption,
} from '@yunke/trade-request';
import { YkLoading } from '@yunke/yunked';
import { message, Modal } from 'antd';
import { meta } from '@/utils/config';
import { gotoLogin } from '@/utils/common';

export interface HttpJson<T = any> {
  retCode: string;
  message: string;
  data: T;
}

export type RequestConfig = AxiosRequestConfig &
  LoadingOption &
  ShowErrorOption &
  FormDataOption & { metadata?: { orgcode?: string } };

const request = createRequest<RequestConfig, HttpJson>({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    // php代码库登录态302用用此头做ajax请求判断，需加上
    'X-Requested-With': 'XMLHttpRequest',
  },
});
// php 部分旧的接口需使用 formdata 方式提交数据
request.middlewares.request.use(loadingMiddleware({
  showLoading: () => void YkLoading.start(),
  hideLoading: () => void YkLoading.end(),
  hideLoadingNextTick: true,
}));
request.middlewares.request.use(showErrorMiddleware({
  showError: (err: SerializedError<'retCode', 'message'>) =>
    void message.error({ content: err.message || '系统繁忙，请稍后再试' }),
  handleError: (err: SerializedError<'retCode', 'message'>, { config }) => {
    if (err.aborted) {
      console.log('request cancel', err.message);
      return false;
    }
    if (
      (/^\/index\.php/.test(config.baseURL || config.url || '') && err.retCode === '-999') ||
    err.retCode === '5'
    ) {
      Modal.info({
        icon: null,
        title: '提醒',
        content: '您尚未登录，请登录！',
        okText: '确定',
        onOk: () => {
          gotoLogin();
        },
      });
      return false;
    }
  },
}));
request.middlewares.request.use(serializedErrorMiddleware());
request.middlewares.request.use(formDataMiddleware());
request.middlewares.request.use(requestIdMiddleware());
request.middlewares.response.use(serializedResponseMiddleware());
request.middlewares.request.use(async (ctx, next) => {
  // 业务方加的一些配置参数
  const { config } = ctx;
  const { authFrom, ...params } = meta.data;
  const { metadata } = config;
  config.params = { ...params, ...metadata, ...config.params };
  if (authFrom) {
    if (!config.headers) config.headers = {};
    config.headers['Auth-From'] = authFrom;
  }
  await next();
});
export default request;

```