import SearchLogo from "../assets/navLogo/search.png";
import ExploreLogo from "../assets/navLogo/explore.png";
import ReelsLogo from "../assets/navLogo/reel.png";
import MessagesLogo from "../assets/navLogo/message.png";
import NotificationsLogo from "../assets/navLogo/like.png";
import CreateLogo from "../assets/navLogo/create.png";
import HomeLogo from "../assets/navLogo/home.png";
import profile from "../assets/profile.jpg";
import Logo from "../assets/navLogo/instagram.png";
import { Link } from "react-router-dom";
const sidebarItems = [
  {
    name: "Search",
    link: "/search",
    icon: SearchLogo,
  },
  {
    name: "Explore",
    link: "/explore",
    icon: ExploreLogo,
  },
  {
    name: "Reels",
    link: "/reels",
    icon: ReelsLogo,
  },
  {
    name: "Messages",
    link: "/messages",
    icon: MessagesLogo,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: NotificationsLogo,
  },
  {
    name: "Create",
    link: "/create",
    icon: CreateLogo,
  },
];

export default function Navbar() {
  return (
    <div className="w-full h-full relative">
      <Link to="/" className="mb-10 px-2  lg:block md:block sm:hidden hidden">
        <img src={Logo} alt="Logo" className="w-28 h-auto" />
      </Link>
      <div className="w-full h-auto flex items-start flex-col gap-y-2 ">
        <Link
          to={"/"}
          className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded ease-out duration-500"
        >
          <img
            src={HomeLogo}
            alt="home icon"
            className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
          />
          <p className="text-base font-semibold text-white lg:block md:hidden sm:hidden hidden">
            Home
          </p>
        </Link>

        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded ease-out duration-500"
          >
            <img
              src={item.icon}
              alt="home icon"
              className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
            />
            <p className="text-base font-semibold text-white lg:block md:hidden sm:hidden hidden">
              {item.name}
            </p>
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
          <p className="text-base font-semibold text-white lg:block md:hidden sm:hidden hidden">
            Profile
          </p>
        </Link>
      </div>
    </div>
  );
}
