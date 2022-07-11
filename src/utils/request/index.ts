import { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { Storage } from "@/utils/storage";
import {
  createRequest,
  loadingMiddleware,
  axiosFormDataMiddleware,
  LoadingOption,
  SerializedError,
  serializedErrorMiddleware,
  serializedResponseMiddleware,
  showErrorMiddleware,
  ShowErrorOption,
  AxiosFormDataOption,
  axiosCreateRequest,
} from "../baseRequest";

export interface HttpJson<T = any> {
  retCode: string;
  message: string;
  data: T;
}

export type RequestType<T extends RequestConfig> = Omit<RequestConfig, keyof T> & T;

export type RequestGetType<T = Record<string, any>> = RequestType<{ params: T }>;
export type RequestPostType<T = Record<string, any>> = RequestType<{ data: T }>;

export type RequestConfig = AxiosRequestConfig &
  LoadingOption &
  ShowErrorOption &
  AxiosFormDataOption;

const request = axiosCreateRequest<RequestConfig, HttpJson>({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
// php 部分旧的接口需使用 formdata 方式提交数据
// request.middlewares.request.use(
//   loadingMiddleware({
//     showLoading: () => void YkLoading.start(),
//     hideLoading: () => void YkLoading.end(),
//     hideLoadingNextTick: true,
//   }),
// );
request.middlewares.request.use(
  showErrorMiddleware({
    showError: (err: SerializedError<"retCode", "message">) =>
      void toast.error(err.message || "系统繁忙，请稍后再试"),
  }),
);
request.middlewares.request.use(axiosFormDataMiddleware());
request.middlewares.response.use(serializedResponseMiddleware());
request.middlewares.request.use(async (ctx, next) => {
  const { config } = ctx;
  config.params = { ...config.data, ...config.params };
  const storage = new Storage(sessionStorage, "Talks");
  if (config.headers)
    config.headers.Authorization = `Bearer ${storage.getItem("token")}`;
  await next();
});
export default request;
