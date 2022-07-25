import user from "./user";
import photo from "./photo";
import community from "./community";
import comment from "./comment";
import common from "./common";

export type CommonReq = any;
export type CommonRes = any;

const Api = {
  ...community,
  ...photo,
  ...user,
  ...comment,
  ...common,
};

export default Api;
