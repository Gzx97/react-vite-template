import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren, ReactElement } from "react";
import { hasAnyPermission } from "@/utils/permission";
import { useUserStore } from "@/stores/modules/user";

export interface AuthorizedRouteProps {
  access?: string[];
}

// 🌟 用PropsWithChildren包裹，且明确返回值类型为ReactElement
const AuthorizedRoute = ({ access, children }: PropsWithChildren<AuthorizedRouteProps>): ReactElement => {
  const { userInfo } = useUserStore();
  const location = useLocation();

  // 非空判断兜底，避免运行时错误
  if (!userInfo?.roles || !userInfo?.permissions) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!access || access.length === 0) {
    return <>{children}</>; // 必须用<>包裹children，避免ESLint解析错误
  }

  const hasPermission = hasAnyPermission(access.filter(Boolean));
  if (!hasPermission) {
    return <Navigate to="/not-auth" replace />;
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
