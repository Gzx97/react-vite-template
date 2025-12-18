import { FC } from "react";
import { useParams } from "react-router-dom";

export const UserManagementDetail: FC = () => {
  const { id } = useParams();

  return (
    <>
      <div>详情{id}</div>
    </>
  );
};
