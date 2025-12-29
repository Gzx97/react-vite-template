import { FC, PropsWithChildren } from "react";
import { hasAnyPermission, hasPermission, hasRole } from "@/utils/permission";
import { useUserStore } from "@/stores/modules/user";

interface AccessProps {
  permissions: string[];
  // 无权限时显示的内容（可选）
  fallback?: React.ReactNode;
}

const Access: FC<PropsWithChildren<AccessProps>> = ({ permissions, children, fallback = null }) => {
  const { userInfo } = useUserStore.getState();
  if (!userInfo) return <>{fallback}</>;
  const isAccessible = hasAnyPermission(permissions);

  return isAccessible ? <>{children}</> : <>{fallback}</>;
};

export default Access;
