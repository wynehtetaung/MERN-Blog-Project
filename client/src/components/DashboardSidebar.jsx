import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function DashboardSidebar() {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();

  return (
    <>
      <Sidebar className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              active={search.get("tab") === "profile"}
              label={`User`}
              labelColor="dark"
              icon={HiUser}
              className="cursor-pointer"
              onClick={() => navigate("/dashboard?tab=profile")}
            >
              Profile
            </Sidebar.Item>
            <span className="hidden md:block">
              <Sidebar.Item
                icon={HiArrowSmRight}
                className="cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-500 "
              >
                Sign Out
              </Sidebar.Item>
            </span>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
