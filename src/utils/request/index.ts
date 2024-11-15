import type { AxiosInstance } from "axios";
import axios from "./instance";
import middlewares from "./middlewares";
import { StaticRequest, StaticResponse } from "./statics";
import type { Codelist, Http as HttpType, Maps, Options, StaticMiddlewares, StaticRequest as StaticRequestType, StaticResponse as StaticResponseType, Whitelist } from "./types";

// 初始化:字段映射
const mapsinit = { code: "retCode", data: "data", message: "message" };

class Request {
  private fetch: AxiosInstance; // axios 实例
  private maps: Maps; // 字段映射
  private whitelist: Whitelist; // 白名单
  private codelist: Codelist; // code 处理

  constructor(options?: Options) {
    const { whitelist, codelist, maps, ..._options } = options || {};
    this.fetch = axios(_options);
    this.maps = maps || mapsinit;
    this.whitelist = whitelist || [];
    this.codelist = codelist || {};
  }

  static maps: Maps = mapsinit; // 字段映射

  static whitelist: Whitelist = []; // 白名单

  static codelist: Codelist = {}; // code 处理

  static Request: StaticRequestType = StaticRequest; // 处理 Request

  static Response: StaticResponseType = StaticResponse; // 处理 Response

  static Middlewares: StaticMiddlewares = middlewares;

  // 请求
  Http: HttpType = (url, options) => {
    const { fetch, maps, whitelist, codelist } = this;
    const _whitelist = (whitelist || []).concat(Request?.whitelist || []); // 白名单
    const _codelist = Object.assign(codelist || {}, Request?.codelist || {}); // 白名单
    const _maps = Object.assign(maps || mapsinit, Request?.maps || mapsinit); // 自定义节点字段
    const isWhite = _whitelist.some((item) => item.includes(url)); // 白名单

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const promise = new Promise<any>((resolve, reject) => {
      options.data = options?.data?.data || options?.data;
      options.params = options?.params?.params || options?.params;
      const aaa = Request.Request({
        url,
        ...(options || {}),
      });
      console.log("aaa", aaa);
      fetch(
        Request.Request({
          url,
          ...(options || {}),
        }),
      )
        .then((response) => {
          resolve(
            Request.Response(response, {
              isWhite,
              maps: _maps,
              whitelist: _whitelist,
              codelist: _codelist,
            }),
          );
        })
        .catch((error) => {
          resolve({ error: true, ...(error?.response?.data || {}) });
          // reject(error);
        });
    });

    return promise;
  };

  // 处理 FormData
  formData = (data: { [key: string]: any }) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    return formData;
  };

  // 设置 Token
  setToken = (token?: string) => {
    if (token) {
      this.fetch.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  };

  // 移除 Token
  removeToken = () => {
    this.fetch.defaults.headers.common.Authorization = null;
  };
}

export default Request;
