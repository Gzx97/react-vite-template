import { Outlet } from "react-router-dom";

export default function SystemLayout() {
  return (
    <div className="text-indigo-700">
      <Outlet />
    </div>
  );
}
