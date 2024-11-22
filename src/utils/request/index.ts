import { Storage } from "@/utils/storage";
import instance from "./instance";
import Middlewares from "./middlewares";

export const SECRET_KEY = "PoBJVJNsGPG8ee2N"; // 密钥KEY
export const SECRET_IV = "jmTrhK8phuSZ1y85"; // 密钥IV

const baseURL = "/api";
export const request = (option = {}) =>
  instance({
    baseURL,
    requestMiddlewares: [
      Middlewares.Encrypt(SECRET_KEY, SECRET_IV),
      (config) => {
        const storage = new Storage(localStorage, "Talks");
        const token = storage.getItem("token");
        if (config.headers) config.headers.Authorization = `Bearer ${token}`;
        return Promise.resolve(config);
      },
    ],
    responseMiddlewares: [
      Middlewares.Decrypt(SECRET_KEY, SECRET_IV),
      (response) => {
        if (response.data.retCode !== "0") {
          return Promise.reject(response.data);
        }
        return response;
      },
    ],
    ...option,
  });

export default request;
