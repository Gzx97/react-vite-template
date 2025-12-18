import { withAuth } from "./withAuth";

export const addAuthToRoutes = (routes: any[]) => {
  return routes.map((route) => {
    const newRoute = { ...route };

    if (newRoute.access && newRoute.lazy) {
      const originalLazy = newRoute.lazy;

      newRoute.lazy = async () => {
        const result = await originalLazy();

        if (result.Component) {
          const AuthComponent = withAuth(result.Component, newRoute.access);
          return {
            ...result,
            Component: AuthComponent,
          };
        }

        return result;
      };
    }

    if (newRoute.children) {
      newRoute.children = addAuthToRoutes(newRoute.children);
    }

    return newRoute;
  });
};
