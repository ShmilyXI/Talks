/* 公共 */

import axios from "axios";

const commonApi = {
  /** 根据关键字查询地点 **/
  getPlaceByKeyword: (params) =>
    axios({
      url: "https://restapi.amap.com/v3/place/text",
      method: "GET",
      params,
    }),
};
export default commonApi;
