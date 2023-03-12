import user from "./user";
import photo from "./photo";
import gallery from "./gallery";
import talk from "./talk";
import comment from "./comment";
import common from "./common";

export type CommonReq = any;
export type CommonRes = any;

const Api = {
  ...talk,
  ...photo,
  ...gallery,
  ...user,
  ...comment,
  ...common,
};

export default Api;
