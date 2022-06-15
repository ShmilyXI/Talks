import request from "@/utils/request";
import { CommonReq, CommonRes } from "./";

// 登录
const userLogin = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/user/login",
        method: "POST",
        data,
    });
};

// 注册
const userRegister = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/user/register",
        method: "POST",
        data,
    });
};

// 获取用户信息
const getUserInfo = (data: CommonReq) => {
    return request<CommonReq, CommonRes>({
        url: "/user/user-info",
        method: "GET",
        data,
    });
};

export default { userLogin, userRegister, getUserInfo };
