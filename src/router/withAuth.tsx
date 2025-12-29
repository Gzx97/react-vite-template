import { ComponentType } from "react";
import AuthorizedRoute from "./AuthorizedRoute";

/**
 * 高阶组件：给页面组件添加权限守卫
 * @param Component 页面组件
 * @param access 所需权限数组
 * @returns 带权限守卫的组件
 */
export const withAuth = <P extends object>(Component: ComponentType<P>, access?: string[]) => {
  return (props: P) => (
    <AuthorizedRoute access={access}>
      <Component {...props} />
    </AuthorizedRoute>
  );
};
