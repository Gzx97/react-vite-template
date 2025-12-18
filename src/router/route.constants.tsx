import { Link, Outlet } from "react-router-dom";
import { ProgressBar } from "@/components/progress-bar";
import LandingPage from "@/pages/landing";
import UserManagement from "@/pages/system-management/user-management";
import SystemLayout from "@/pages/system-management";
import PermissionManagement from "@/pages/system-management/permission-management";
import { UserManagementDetail } from "@/pages/system-management/user-management/detail";
import { RouteObjectWithAccess } from "./type";

export const ROUTE_PATHS = {
  login: "/login",
  notFound: "/not-found",
  landing: "/landing",
  systemManagement: "/system-management",
  userManagement: "/system-management/user-management",
  userManagementDetail: "/system-management/user-management/detail",
  permissionManagement: "/system-management/permission-management",
};

export const landingRoute: RouteObjectWithAccess = {
  path: ROUTE_PATHS.landing,
  lazy: async () => ({
    Component: LandingPage,
  }),
  HydrateFallback: ProgressBar,
  handle: {
    title: "首页",
  },
};

// 系统管理
export const systemManagementRoute: RouteObjectWithAccess = {
  path: ROUTE_PATHS.systemManagement,
  access: ["admin"],
  lazy: async () => ({
    Component: SystemLayout,
  }),
  HydrateFallback: ProgressBar,
  handle: {
    title: "系统管理",
    crumb: () => "系统管理",
  },
  children: [
    {
      path: ROUTE_PATHS.userManagement,
      handle: {
        title: "用户管理",
        element: <Outlet />,
        crumb: () => <Link to={ROUTE_PATHS.userManagement}>用户管理</Link>,
      },
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: UserManagement,
          }),
          HydrateFallback: ProgressBar,
        },
        {
          path: `${ROUTE_PATHS.userManagementDetail}/:id`,
          lazy: async () => ({
            Component: UserManagementDetail,
          }),
          HydrateFallback: ProgressBar,
          handle: {
            title: "用户详情",
            crumb: () => "用户详情",
          },
          parentPath: ROUTE_PATHS.userManagement, // 关联上级路由路径
        },
      ],
    },
    {
      path: ROUTE_PATHS.userManagement,
      lazy: async () => ({
        Component: UserManagement,
      }),
      HydrateFallback: ProgressBar,
      handle: {
        title: "用户管理",
        crumb: () => <Link to={ROUTE_PATHS.userManagement}>用户管理</Link>,
      },
    },

    {
      path: ROUTE_PATHS.permissionManagement,
      lazy: async () => ({
        Component: PermissionManagement,
      }),
      HydrateFallback: ProgressBar,
      handle: {
        title: "权限管理",
        crumb: () => <Link to={ROUTE_PATHS.permissionManagement}>权限管理</Link>,
      },
    },
  ],
};
