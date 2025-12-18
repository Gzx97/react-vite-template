import { useNavigate } from "react-router-dom";
import { Button, Form, type FormProps, Input, message } from "antd";
import { ROUTE_PATHS } from "@/router/route.constants";
import { login } from "@/api/modules/account/user";
import { useRequest } from "ahooks";
import { setUser } from "@/stores/modules/user";

type FieldType = {
  account?: string;
  password?: string;
};

export default function LoginForm() {
  const navigate = useNavigate();

  const { run: onLogin, loading } = useRequest(login, {
    manual: true,
    onSuccess(data, params) {
      localStorage.setItem("token", data?.data?.accessToken);
      const mockAdmin = {
        accessToken: "xxxxx",
        username: "admin@qq.com",
        avatar: "",
        permissions: ["*:*:*"],
        roles: ["admin"],
        expireTime: "",
      };
      const mockUser = {
        accessToken: "xxxxx",
        username: "user@qq.com",
        avatar: "",
        permissions: ["device:add"],
        roles: ["user"],
        expireTime: "",
      };
      setUser({
        // userInfo: data.data,
        // ...mockAdmin,
        ...mockUser,
      });
      navigate(ROUTE_PATHS.landing);
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (loading) return;
    onLogin(values);
    message.success("登录成功");
    // navigate(ROUTE_PATHS.landing);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      initialValues={{ username: "123@qq.com", password: "1234qwer" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="username" rules={[{ required: true, message: "请输入手机号" }]}>
        <Input placeholder="请输入手机号" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
