import axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { Storage } from "@/utils/storage";
import { axiosFormDataMiddleware, LoadingOption, SerializedError, serializedResponseMiddleware, showErrorMiddleware, ShowErrorOption, AxiosFormDataOption } from "./middleware";
import { axiosCreateRequest } from "./axiosCreateRequest";

export interface HttpJson<T = any> {
  retCode: string;
  message: string;
  data: T;
}

export type RequestType<T extends RequestConfig> = Omit<RequestConfig, keyof T> & T;

export type RequestGetType<T = Record<string, any>> = RequestType<{ params: T }>;
export type RequestPostType<T = Record<string, any>> = RequestType<{ data: T }>;

export type RequestConfig = AxiosRequestConfig & LoadingOption & ShowErrorOption & AxiosFormDataOption;

let controller;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

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
    showError: (err: SerializedError<"retCode", "message">) => void toast.error(err?.message || "系统繁忙，请稍后再试"),
    handleError: (ctx, { config }) => {
      const err = ctx.response.data;
      ctx.message = err.message;
      ctx.retCode = err.retCode;
      if (err.retCode === "-3" || err.retCode === "-4") {
        toast.error("登录态过期，请重新登录！", { id: "1" });
        const storage = new Storage(localStorage, "Talks");
        storage.removeItem("token");
        storage.removeItem("userInfo");
        window.location.replace("/login?signIn=1");
        return false;
      }
      if (err.retCode === "-5") {
        toast.error("无权限,请登录后查看!");
        return false;
      }
    },
  }),
);
request.middlewares.request.use(axiosFormDataMiddleware());
request.middlewares.response.use(serializedResponseMiddleware());
request.middlewares.request.use(async (ctx, next) => {
  const { config } = ctx;
  // config.params = { ...config.data, ...config.params };
  const storage = new Storage(localStorage, "Talks");
  const token = storage.getItem("token");
  if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  await next();
});
export default request;
