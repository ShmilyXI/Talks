/* eslint-disable @typescript-eslint/no-shadow */
import { Storage } from "@/utils/storage";
import type {} from "axios";
import chalk from "chalk";
import * as CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import type { Decrypt as DecryptType, Encrypt as EncryptType, RequestInterceptor, ResponseInterceptor } from "./types";

// 创建密钥
const createSecretKey = (key: string, iv: string) => {
  const KEY = CryptoJS.enc.Hex.parse(key);
  const CONFIG = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Hex.parse(iv),
  };
  return { KEY, CONFIG };
};

// 请求拦截器
export const request: RequestInterceptor = async (config) => {
  return config; // 可以直接返回，不需要 Promise.resolve
};

// 返回拦截器
export const response: ResponseInterceptor = async (config) => {
  return config; // 同上
};

// 创建加密
export const Encrypt: EncryptType = (key, iv) => {
  const { KEY, CONFIG } = createSecretKey(key, iv);

  const encrypt: RequestInterceptor = async (request) => {
    console.group();
    console.log(chalk.bold.bgGreenBright("request:"));
    console.log("url:", request.url);
    console.log("data:", request.data);
    console.groupEnd();

    const isFormDataRequest = (request.headers["Content-Type"] as any)?.includes("multipart/form-data");
    if (request?.data && !isFormDataRequest) {
      try {
        const dataJSON = JSON.stringify(request.data);
        const encrypted = CryptoJS.AES.encrypt(dataJSON, KEY, CONFIG).toString();
        request.data = encrypted;
      } catch (error) {
        console.error("加密失败:", error);
      }
    }
    // if (request?.params && !isFormDataRequest) {
    //   console.log("request?.params: ", request?.params);
    //   try {
    //     const dataJSON = JSON.stringify(request.params);
    //     const encrypted = CryptoJS.AES.encrypt(dataJSON, KEY, CONFIG).toString();
    //     request.params = encrypted;
    //   } catch (error) {
    //     console.error("加密参数失败:", error);
    //   }
    // }
    return request; // 可以直接返回，不需要 Promise.resolve
  };

  return encrypt;
};

// 创建解密
export const Decrypt: DecryptType = (key, iv) => {
  const { KEY, CONFIG } = createSecretKey(key, iv);

  const decrypt: ResponseInterceptor = async (response) => {
    console.log("decrypt response: ", response);
    if (response?.data) {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(response.data as unknown as string, KEY, CONFIG);
        const plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);

        // 检查解密后的文本是否有效 JSON
        if (plaintext) {
          response.data = JSON.parse(JSON.parse(plaintext));
          console.group();
          console.log(chalk.bold.bgCyanBright("response:"));
          console.log("url:", response.config.url);
          console.log("data:", response.data);
          console.groupEnd();
        } else {
          console.warn("解密后文本为空");
        }
      } catch (error) {
        console.error("解密失败:", error);
      }
    }
    console.log("decrypt", response);
    return response; // 可以直接返回，不需要 Promise.resolve
  };

  return decrypt;
};

// 设置 Token
export const SetToken: RequestInterceptor = async (config) => {
  const token = await `Bearer ${"mock_token"}`;
  config.headers.Authorization = token;
  return Promise.resolve(config);
};

// 防抖
export const Debounce: RequestInterceptor = async (config) => {
  return Promise.resolve(config);
};

// 处理错误
export const HandleError: any = async (error) => {
  const storage = new Storage(localStorage, "Talks");
  if (error.response.status === 401) {
    toast.error(error?.response?.data?.message || "登录失效，请重新登录");
    location.replace("/login");
    storage.clear();
  }
  return Promise.reject(error);
};

// 处理成功
export const HandleSuccess: ResponseInterceptor = async (response) => {
  return Promise.resolve(response);
};

const Middlewares = {
  Encrypt,
  Decrypt,
  SetToken,
  Debounce,
  HandleError,
  HandleSuccess,
};

export default Middlewares;
