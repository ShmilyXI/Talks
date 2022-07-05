import request from "@/utils/request1";
import user from "./user";
import photo from "./photo";
import community from "./community";

export type CommonReq = any;
export type CommonRes = any;

const Api = {
    ...community,
    ...photo,
    ...user,
};

export default Api;
