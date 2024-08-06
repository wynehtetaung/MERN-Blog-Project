import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import FooterCom from "./components/FooterCom";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <FooterCom />
    </>
  );
}
