import Request from "./request";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { Storage } from "@/utils/storage";

import type { RequestConfig } from "./types";

export interface BaseResponse<T> {
    statusCode: number;
    desc: string;
    result: T;
}

// 重写返回类型
interface BaseRequestConfig<T, R> extends RequestConfig<BaseResponse<R>> {
    data?: T;
}

const baseURL = "/api";

const request = new Request({
    baseURL,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: (config) => {
            const storage = new Storage(sessionStorage, "Talks");
            if (config.headers)
                config.headers.Authorization = `Bearer ${storage.getItem(
                    "token",
                )}`;
            return config;
        },
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            if (result.data?.code !== "0") {
                toast.error(result.data.message, { id: "error" });
            }
            return result;
        },
        responseInterceptorsCatch: (error) => {
            const data = error.response?.data;
            toast.error(data?.message || "系统繁忙，请稍后再试", {
                id: "error",
            });
            if (data?.code === "-3") {
                const storage = new Storage(sessionStorage, "Talks");
                storage.removeItem("token");
                window.location.href = "/login?signIn=1";
            }
        },
    },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {BaseRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const BaseRequest = <D = any, T = any>(config: BaseRequestConfig<D, T>) => {
    const { method = "GET" } = config;
    if (method?.toUpperCase() === "GET") {
        config.params = config.data;
    }
    return request.request<BaseResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
    return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
    return request.cancelAllRequest();
};

export default BaseRequest;
