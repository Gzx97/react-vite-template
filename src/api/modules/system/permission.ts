import { get, post } from "../../request";
const baseUri = "api/v1/permission";

export const fetchPermissionList = async (params = { current: 1, size: 10 }) => {
  const mockData = [
    {
      id: "1",
      code: "device:add",
      created_at: "2025-12-12T03:22:22.319000",
      name: "新增设备",
      description: "",
    },
    {
      id: "1-1",
      code: "device:edit",
      created_at: "2025-12-12T03:22:22.319000",
      name: "修改设备",
      description: "",
    },
    {
      id: "2",
      code: "organization:add",
      created_at: "2025-12-12T03:22:22.319000",
      name: "新增客户",
      description: "",
    },
    {
      id: "2-2",
      code: "organization:edit",
      created_at: "2025-12-12T03:22:22.319000",
      name: "修改客户",
      description: "",
    },
  ];
  return Promise.resolve(mockData);
  return get(`${baseUri}`, params);
};
