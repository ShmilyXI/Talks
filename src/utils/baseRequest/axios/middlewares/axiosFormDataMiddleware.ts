import { stringify } from 'qs';
import { AxiosRequestConfig } from 'axios';
import { Context, Middleware } from '../../base';

export type AxiosFormDataOption = {
  useFormData?: boolean;
};

type Config = Pick<AxiosRequestConfig, 'method' | 'headers' | 'params' | 'data'>;

/**
 * 处理formData参数，这里使用的是request拦截器
 */
export function axiosFormDataMiddleware(): Middleware<Context<Config & AxiosFormDataOption>> {
  return async (ctx, next) => {
    const { config } = ctx;
    // post 时把数据自动转成 form data 格式
    const { method, data } = config;
    const { useFormData } = config;
    if (useFormData && /^post$/i.test(method || '')) {
      if (!config.headers) config.headers = {};
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      if (typeof data === 'object') {
        config.data = stringify(data);
      }
    }
    await next();
  };
}

