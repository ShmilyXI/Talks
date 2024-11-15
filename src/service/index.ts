import { Storage } from "@/utils/storage";
import Request from "../utils/request";
import comment from "./comment";
import common from "./common";
import gallery from "./gallery";
import photo from "./photo";
import talk from "./talk";
import user from "./user";

export const SECRET_KEY = "PoBJVJNsGPG8ee2N"; // 密钥KEY
export const SECRET_IV = "jmTrhK8phuSZ1y85"; // 密钥IV

const Api = {
  ...talk,
  ...photo,
  ...gallery,
  ...user,
  ...comment,
  ...common,
};

export const baseRequest = new Request({
  baseURL: "/api",
  codelist: {},
  maps: {},
  // headers: {
  //   "Content-Type": "application/json",
  // },
  requestMiddlewares: [
    Request.Middlewares.Encrypt(SECRET_KEY, SECRET_IV),
    (config) => {
      const storage = new Storage(localStorage, "Talks");
      const token = storage.getItem("token");
      if (config.headers) config.headers.Authorization = `Bearer ${token}`;
      return Promise.resolve(config);
    },
  ],

  responseMiddlewares: [
    Request.Middlewares.Decrypt(SECRET_KEY, SECRET_IV),
    // showErrorMiddleware({
    //   showError: (err: SerializedError<"retCode", "message">) => void toast.error(err?.message || "系统繁忙，请稍后再试"),
    //   handleError: (ctx, { config }) => {
    //     const err = ctx.response.data;
    //     ctx.message = err.message;
    //     ctx.retCode = err.retCode;
    //     if (err.retCode === "-3" || err.retCode === "-4") {
    //       toast.error("登录态过期，请重新登录！", { id: "1" });
    //       const storage = new Storage(localStorage, "Talks");
    //       storage.removeItem("token");
    //       storage.removeItem("userInfo");
    //       window.location.replace("/login?signIn=1");
    //       return false;
    //     }
    //     if (err.retCode === "-5") {
    //       toast.error("无权限,请登录后查看!");
    //       return false;
    //     }
    //   },
    // }),
    // (response) => {
    //   return Promise.resolve(response);
    // },
  ],
});

export default Api;
