import { useUserStore } from "@/stores/modules/user";

/**
 * 检查是否拥有指定权限
 * @param permissionCode 权限标识
 * @returns 是否有权限
 */
export const hasPermission = (permissionCode: string): boolean => {
  const { userInfo } = useUserStore.getState();
  if (!userInfo) return false;

  // 超级管理员拥有所有权限
  if (userInfo?.roles?.includes("admin")) {
    return true;
  }

  // 检查是否有指定权限或通配符权限
  return userInfo?.permissions?.includes(permissionCode) || userInfo.permissions.includes("*:*:*");
};

/**
 * 检查是否拥有指定角色
 * @param roleCode 角色标识
 * @returns 是否有该角色
 */
export const hasRole = (roleCode: string): boolean => {
  const { userInfo } = useUserStore.getState();
  return !!userInfo?.roles?.includes(roleCode);
};

/**
 * 检查是否拥有指定权限中的任意一个
 * @param permissionCodes 权限标识列表
 * @returns 是否有权限
 */
export const hasAnyPermission = (permissionCodes: string[]): boolean => {
  const { userInfo } = useUserStore.getState();

  if (!userInfo) return false;

  // 超级管理员拥有所有权限
  if (userInfo?.roles?.includes("admin")) {
    return true;
  }

  return permissionCodes.some((code) => userInfo?.permissions?.includes(code));
};
