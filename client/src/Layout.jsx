import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
export default function Layout() {
  return (
    <>
      <h2 className="text-xl text-purple-700">layout</h2>
      <Home />
      <Outlet />
    </>
  );
}
