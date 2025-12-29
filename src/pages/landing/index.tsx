import Access from "@/components/access";
import { Typography } from "antd";

export default function LandingPage() {
  return (
    <>
      <Typography.Title level={4}>首页</Typography.Title>
      <Access permissions={["device:add"]}>
        <div>你有权限查看这个内容</div>
      </Access>
    </>
  );
}
