import type { AxiosResponse } from "axios";
import type { Options, Response, StaticRequest as StaticRequestType, StaticResponse as StaticResponseType } from "./types";

type ProcessingCode = (response: AxiosResponse<Response> | Response, options: Options & { isWhite?: boolean }) => string;

// 处理 Code
const processingCode: ProcessingCode = (response, { codelist, maps }) => {
  const code = (response as { [key: string]: any })?.[maps?.retCode || "retCode"];
  const type = Object.prototype.toString.call((codelist || {})[code]);

  if (type === "[object String]") {
    const message = (codelist || {})[code];
    return message;
  } else if (type === "[object Function]") {
    const message = ((codelist || {})[code] as (response: Response) => string | void)(response as Response);
    return message;
  } else {
    const message = (response as { [key: string]: any })?.[maps?.message || "message"] || (response as { [key: string]: any })?.[maps?.data || "data"] || "server error";
    return message;
  }
};

// 处理 Response
export const StaticResponse: StaticResponseType = (response, { isWhite, whitelist, codelist, maps }) => {
  const responseData = response?.data as any;
  console.log("responseData: ", responseData);

  if (response?.status === 200 || response?.status === 201) {
    if (isWhite) {
      return responseData;
    } else if (responseData?.[maps?.retCode || "retCode"] === "0") {
      return responseData;
    } else {
      const message = processingCode(responseData as Response, {
        isWhite,
        whitelist,
        codelist,
        maps,
      });
      console.error("#### code 错误 ####", message);
      return { error: true, message };
    }
  } else {
    const message = processingCode(response, {
      isWhite,
      whitelist,
      codelist,
      maps: { retCode: "status" },
    });
    console.error("#### status 错误 ####", message);
    return { error: true, message };
  }
};

// 处理 Request
export const StaticRequest: StaticRequestType = (options) => {
  return options;
};
