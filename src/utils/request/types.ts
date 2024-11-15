import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Response 数据类型
export interface Response {
  retCode: number;
  message: string;
  data: {
    nickname?: string;
    username?: string;
    age?: number;
    sex?: string;
  };
}

// 创建 Axios 实例
export type CreateAxiosInstance = (options?: Options) => AxiosInstance;

// 字段映射
export type Maps = { retCode?: string; data?: string; message?: string };

// 白名单
export type Whitelist = string[];

// code 处理
export type Codelist = {
  [key: string]: string | ((response: Response) => string | void);
};

// axios & Request 配置项
export type Options = AxiosRequestConfig & {
  maps?: Maps; // 字段映射
  whitelist?: Whitelist; // 白名单
  codelist?: Codelist; // code 处理
  requestMiddlewares?: RequestMiddlewares | any; // 请求中件间
  responseMiddlewares?: ResponseMiddlewares | any; // 响应中件间
};

// Http 请求
export type Http = (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<Response>> | Promise<boolean> | Promise<any>;

// 业务 Request 处理
export type StaticRequest = (options: AxiosRequestConfig) => AxiosRequestConfig;

// 业务 Response 处理
export type StaticResponse = (response: AxiosResponse<Response>, options: Options & { isWhite?: boolean }) => boolean | Response;

// 请求
export type RequestInterceptor = (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>;

// 返回
export type ResponseInterceptor = (response: AxiosResponse<Response>) => Promise<AxiosResponse<Response>>;

// 加密
export type Encrypt = (key: string, iv: string) => RequestInterceptor;

// 解密
export type Decrypt = (key: string, iv: string) => ResponseInterceptor;

// 请求中间件
export type RequestMiddlewares = RequestInterceptor[];

// 响应中间件
export type ResponseMiddlewares = ResponseInterceptor[];

// 中间件
export type StaticMiddlewares = {
  Encrypt: Encrypt;
  Decrypt: Decrypt;
  SetToken: RequestInterceptor;
  Debounce: RequestInterceptor;
  HandleError: ResponseInterceptor;
  HandleSuccess: ResponseInterceptor;
  [key: string]: any;
};
export type Next = () => Promise<any>;

export type Middleware<T> = (context: T, next: Next) => any;

export type ComposedMiddleware<T> = (context: T, next?: Next) => Promise<void>;

export type Context<C = any, R = any> = {
  success: boolean;
  config: C;
  response?: R;
  error?: any;
};
export type SerializedError<CodeKey extends string, MessageKey extends string> = {
  readonly _isSerializedError: boolean;
  aborted?: boolean;
  _reason: any;
} & Record<CodeKey, string> &
  Record<MessageKey, string>;
