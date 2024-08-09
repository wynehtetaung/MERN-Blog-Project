import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams();
  return (
    <>
      {currentUser ? (
        <div className="min-h-screen flex flex-col md:flex-row">
          <div className="md:w-56">
            {/* Side bar */}
            <DashboardSidebar />
          </div>
          <div className="w-full">
            {/* main section */}
            {search.get("tab") === "profile" && <DashboardProfile />}
          </div>
        </div>
      ) : (
        <Navigate to={`/signIn`} />
      )}
    </>
  );
}
