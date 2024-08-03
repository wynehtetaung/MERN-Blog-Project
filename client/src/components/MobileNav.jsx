import { Link } from "react-router-dom";
import HomeLogo from "../assets/navLogo/home.png";
import SearchLogo from "../assets/navLogo/search.png";
import NotificationsLogo from "../assets/navLogo/like.png";
import profile from "../assets/profile.jpg";
import CreateLogo from "../assets/navLogo/create.png";
const sidebarItems = [
  {
    link: "/search",
    icon: SearchLogo,
  },
  {
    link: "/create",
    icon: CreateLogo,
  },
  {
    link: "/reels",
    icon: NotificationsLogo,
  },
];
export default function MobileNav() {
  return (
    <>
      <div className="w-full h-auto text-white">
        <div className="w-full h-auto flex items-center gap-x-2">
          <Link
            to={"/"}
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent"
          >
            <img
              src={HomeLogo}
              alt="home icon"
              className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
            />
          </Link>
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent"
            >
              <img
                src={item.icon}
                alt="home icon"
                className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
              />
            </Link>
          ))}
          <Link
            to={"/profile"}
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded ease-out duration-500"
          >
            <img
              src={profile}
              alt="home icon"
              className="w-6 h-6 object-cover rounded-full group-hover:scale-105 ease-out duration-300"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
