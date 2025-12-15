import { FC, useState } from "react";
import { Button } from "antd";
import EditModal from "./EditModal";
import { fetchUserList } from "../api";

type EditButtonProps = {
  data: any;
  onRefresh?: () => void;
};

const EditButton: FC<EditButtonProps> = ({ data, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const createPromise = (data: any) => {
    return fetchUserList();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  };
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    return createPromise(values);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button type="link" size="small" onClick={handleOpen}>
        编辑
      </Button>
      <EditModal open={open} initialValues={data} onCreate={onCreate} onCancel={handleClose} />
    </>
  );
};

export default EditButton;
