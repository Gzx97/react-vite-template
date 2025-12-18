import { type IndexRouteObject, type NonIndexRouteObject } from "react-router-dom";

export type RouteAccess = string | string[] | ((route: RouteObjectWithAccess) => boolean | Promise<boolean>);
export type ParentPath = string | ((route: RouteObjectWithAccess) => boolean | Promise<boolean>);

interface NonIndexRouteObjectWithAccess extends Omit<NonIndexRouteObject, "children"> {
  access?: RouteAccess;
  parentPath?: ParentPath;
  title?: string;
  icon?: string;
  children?: RouteObjectWithAccess[];
}

interface IndexRouteObjectWithAccess extends Omit<IndexRouteObject, "children"> {
  access?: RouteAccess;
  parentPath?: ParentPath;

  title?: string;
  icon?: string;
  children?: never; // 索引路由不能有children
}

// 4. 合并为最终的路由类型（与原生RouteObject结构一致）
export type RouteObjectWithAccess = NonIndexRouteObjectWithAccess | IndexRouteObjectWithAccess;
