import { Table, type TableProps } from "antd";
import EditButton from "./components/EditButton";
import { useRequest } from "ahooks";
import { fetchUserList } from "@/api/modules/account/user";

interface DataType {
  key: string;
  name: string;
  phone: string;
  email: string;
  company: any;
}

export default function UserManagement() {
  const { data, loading, refresh } = useRequest(fetchUserList, {
    manual: false,
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (_, record) => record.company.name,
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
