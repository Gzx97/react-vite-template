import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { ROUTE_PATHS } from "@/router/route.constants";

export default function NotAuth() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>403 | {import.meta.env.VITE_APP_TITLE_SUFFIX}</title>
      </Helmet>
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您没有权限访问此页面。"
        extra={
          <Button type="primary" onClick={() => navigate(ROUTE_PATHS.landing)}>
            返回首页
          </Button>
        }
      />
    </>
  );
}
