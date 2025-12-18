import { Button, Space, Table, type TableProps } from "antd";
import EditButton from "./components/EditButton";
import { useRequest } from "ahooks";
import { fetchPermissionList } from "@/api/modules/system/permission";

interface DataType {
  key: string;
  name: string;
  phone: string;
  email: string;
  company: any;
}

export default function RoleManagement() {
  const { data, loading, refresh } = useRequest(fetchPermissionList, {
    manual: false,
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "角色标识",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "备注",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <EditButton data={record} onRefresh={refresh} />
            {/* TODO: 点击右侧抽屉，根据权限信息为所有角色配置权限 */}
            <Button>权限设置</Button>
          </Space>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />;
}
