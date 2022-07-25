/* 公共 */
import {} from "@/types/PhotoTypes";
import { axiosCreateRequest } from "@/utils/baseRequest";
import { CommonReq, CommonRes } from "./";

const request = axiosCreateRequest();

const commonApi = {
  /** 根据关键字查询地点 **/
  getPlaceByKeyword: (params) =>
    request({
      url: "https://restapi.amap.com/v3/place/text",
      method: "GET",
      params,
    }),
};
export default commonApi;
