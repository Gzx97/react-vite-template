import { Table, type TableProps } from "antd";
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

export default function PermissionManagement() {
  const { data, loading, refresh } = useRequest(fetchPermissionList, {
    manual: false,
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "权限标识",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "权限名称",
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
        return <EditButton data={record} onRefresh={refresh} />;
      },
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />;
}
