import { Navigate, useLocation } from "react-router-dom";
import { hasAnyPermission } from "@/utils/permission";
import { useUserStore } from "@/stores/modules/user";
import { RouteObjectWithAccess } from "./type";
import { isNilEmpty } from "@/utils/isNilEmpty";

interface AuthorizedRouteProps {
  route: RouteObjectWithAccess;
  children: React.ReactNode;
}

const AuthorizedRoute = ({ route, children }: AuthorizedRouteProps) => {
  const { userInfo } = useUserStore();
  const location = useLocation();

  // 未登录跳转到登录页
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 不需要权限控制的路由直接通过
  if (!route.access) {
    return <>{children}</>;
  }

  // 检查权限标识
  if (!isNilEmpty(route.access)) {
    const hasRequiredPermission = hasAnyPermission(route.access as string[]);
    if (!hasRequiredPermission) {
      return <Navigate to="/not-auth" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
