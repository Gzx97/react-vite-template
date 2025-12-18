import { get, post } from "../../request";
import type { ApiResponse, RequestConfig } from "../../types";
const baseUri = "api/v1/auth";

export type UserResult = {
  code: number;
  data?: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    phone: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
  msg?: string;
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type UserInfo = {
  id?: string;
  email?: string;
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  phone: string;
  /** 当前登录用户的角色 */
  roles: Array<string>;
  /** 按钮级别权限 */
  permissions: Array<string>;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};
/**
 * 用户登录
 */
export const login = (params: object, config?: RequestConfig) => {
  return post<ApiResponse<UserInfo>>(`${baseUri}/login`, params, {
    ...config,
    showError: true,
    ...{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  });
};

/**
 * 获取用户信息
 */
export const getUserInfo = (config?: RequestConfig) => {
  return get<UserInfo>("/user/info", undefined, {
    ...config,
  });
};

/**
 * 退出登录
 */
export const logout = (config?: RequestConfig) => {
  return post("/auth/logout", undefined, config);
};

export const fetchUserList = async (params = { page: 3 }) => {
  return get("https://jsonplaceholder.typicode.com/users", params);
};
