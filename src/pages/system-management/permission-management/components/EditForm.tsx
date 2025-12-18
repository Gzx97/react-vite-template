import { useEffect, useState } from "react";
import { unstable_usePrompt } from "react-router-dom";
import { Form, type FormInstance, Input } from "antd";

interface EditFormProps {
  initialValues: any;
  onFormInstanceReady: (instance: FormInstance<any>) => void;
}

export default function EditForm({ initialValues, onFormInstanceReady }: EditFormProps) {
  const [form] = Form.useForm();
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    onFormInstanceReady(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  unstable_usePrompt({
    message: "您还有未保存的修改，确定要离开吗？",
    when: ({ currentLocation, nextLocation }) =>
      hasChanged && currentLocation.pathname !== nextLocation.pathname,
  });

  return (
    <Form
      layout="horizontal"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
      preserve={false}
      labelAlign="left"
      onChange={() => {
        setHasChanged(true);
      }}
      labelCol={{ flex: "50px" }}
      wrapperCol={{ flex: 1 }}
      className="mt-4"
    >
      <Form.Item name="code" label="标识">
        <Input />
      </Form.Item>
      <Form.Item name="name" label="名称">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="备注">
        <Input />
      </Form.Item>
    </Form>
  );
}
