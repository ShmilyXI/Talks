import request from "@/utils/request1";
import user from "./user";
import photo from "./photo";
import community from "./community";
import comment from "./comment";

export type CommonReq = any;
export type CommonRes = any;

const Api = {
  ...community,
  ...photo,
  ...user,
  ...comment,
};

export default Api;
