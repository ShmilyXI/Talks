import type { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}
// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}
export interface CancelRequestSource {
  [index: string]: () => void;
}

export interface HttpJson<T = any> {
  code: string;
  message: string;
  data: T;
}

export type RequestType<T extends RequestConfig> = Omit<RequestConfig, keyof T> & T;

export type RequestGetType<T = Record<string, any>> = RequestType<{ params: T }>;
export type RequestPostType<T = Record<string, any>> = RequestType<{ data: T }>;
