import { get, post } from "../../request";
const baseUri = "api/v1/permission";

export const fetchRoleList = async (params = { current: 1, size: 10 }) => {
  const mockData = [
    {
      id: "0",
      code: "admin",
      name: "超级管理员",
      permissions: ["*:*:*"],
      description: "",
    },
    {
      id: "1",
      code: "user",
      name: "普通用户",
      permissions: ["device:add", "organization:edit"],
      description: "",
    },
  ];
  return Promise.resolve(mockData);
  return get(`${baseUri}`, params);
};
