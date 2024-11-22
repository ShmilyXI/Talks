import request from "@/utils/request";
import comment from "./comment";
import common from "./common";
import gallery from "./gallery";
import photo from "./photo";
import talk from "./talk";
import user from "./user";

const Api = {
  ...talk,
  ...photo,
  ...gallery,
  ...user,
  ...comment,
  ...common,
};

export const baseRequest = request();
export default Api;
