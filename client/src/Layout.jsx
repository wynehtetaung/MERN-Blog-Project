import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="w-full min-h-screen bg-black">
        <Outlet />
      </div>
    </>
  );
}
