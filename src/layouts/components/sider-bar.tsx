import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, KeyOutlined, MenuOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
// import ReactIcon from "@/assets/svg/react.svg?react";
import LOGO from "@/assets/logo.png";
import { ROUTE_PATHS } from "@/router/route.constants";
import { useSelector, useSettingsStore } from "@/stores";
import { RouteObjectWithAccess } from "@/router/type";
import { useUserStore } from "@/stores/modules/user";
import { hasAnyPermission } from "@/utils/permission";
import { isNilEmpty } from "@/utils/isNilEmpty";

const findSelectedKeys = (items: MenuProps["items"], pathname: string, path: string[] = []) => {
  const selectedKeys: string[] = [];
  let openKeys: string[] = [];

  // 辅助函数：逐级向上回溯父路径
  const getParentPaths = (pathname: string): string[] => {
    const paths = [];
    let current = pathname;
    while (current.includes("/")) {
      current = current.substring(0, current.lastIndexOf("/"));
      if (current) paths.push(current);
    }
    return paths;
  };

  const travel = (items: MenuProps["items"], pathname: string, path: string[]) => {
    if (!items || items.length === 0 || !pathname) return false;

    for (const item of items) {
      if (!item) continue;

      // 完全匹配当前路径
      if (item.key === pathname) {
        selectedKeys.push(item.key);
        openKeys = [...path];
        return true;
      }
      const children = (item as any).children;
      // 如果有子菜单，递归检查
      if (children && children.length > 0) {
        const newPath = [...path, item.key as string];

        // 先检查子菜单中是否有完全匹配
        const found = travel(children, pathname, newPath);
        if (found) return true;

        // 如果未找到，逐级回溯父路径并检查
        const parentPaths = getParentPaths(pathname);
        for (const parentPath of parentPaths) {
          if (travel(children, parentPath, newPath)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  travel(items, pathname, path);
  return { selectedKeys, openKeys };
};

// TODO: 过滤菜单项，根据用户权限
const filterMenuItems = (items: any): MenuProps["items"] => {
  const { userInfo } = useUserStore.getState();
  if (!userInfo) return [];
  if (!items) return [];

  return items.filter((item: any) => {
    if (item.access) {
      const hasRequiredPermission = hasAnyPermission(item.access as string[]);
      if (!hasRequiredPermission) return false;
    }

    // 处理子菜单
    if (!isNilEmpty(item?.children)) {
      item.children = filterMenuItems(item.children);
      // 如果子菜单都被过滤，父菜单也不显示
      return item.children.length > 0;
    }

    return true;
  });
};

const items: MenuProps["items"] = [
  {
    icon: <HomeOutlined />,
    label: <Link to={ROUTE_PATHS.landing}>首页</Link>,
    key: ROUTE_PATHS.landing,
  },

  {
    icon: <SettingOutlined />,
    label: "系统管理",
    key: ROUTE_PATHS.systemManagement,
    children: [
      {
        key: ROUTE_PATHS.userManagement,
        icon: <UserOutlined />,
        label: <Link to={ROUTE_PATHS.userManagement}>用户管理</Link>,
      },
      {
        key: ROUTE_PATHS.permissionManagement,
        label: <Link to={ROUTE_PATHS.permissionManagement}>权限管理</Link>,
        icon: <KeyOutlined />,
      },
    ],
  },
];

export default function SiderBar() {
  const location = useLocation();

  const firstRenderRef = useRef(true);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { collapsed } = useSettingsStore(useSelector(["collapsed"]));

  useEffect(() => {
    if (location.pathname === "/") return;

    const { selectedKeys, openKeys } = findSelectedKeys(items, location.pathname);
    setSelectedKeys(selectedKeys);
    // 首次渲染时，设置默认值
    if (firstRenderRef.current) {
      setOpenKeys(openKeys);
    }
    // 将首次渲染标记设置为false
    firstRenderRef.current = false;
  }, [location.pathname]);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme={"light"}
      className="h-screen overflow-auto !sticky top-0 left-0 start-0"
    >
      <Link
        className="font-bold text-xl hover:text-current h-16 flex justify-center items-center gap-2 text-nowrap"
        to="/"
      >
        {/* <ReactIcon className="size-6" /> */}
        <div className={collapsed ? "p-1" : "p-10"}>
          <img src={LOGO} />
        </div>

        {/* {collapsed ? null : <span className="text-gradient-ripple">React Admin</span>} */}
      </Link>
      <Menu
        theme={"light"}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={(openKeys) => setOpenKeys(openKeys)}
        className="!border-e-0"
      />
    </Layout.Sider>
  );
}
