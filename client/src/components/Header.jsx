import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { signInFailure } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  // if (path == "/signIn" || path == "/signup") {
  //   dispatch(signInFailure(null));
  // }
  const logoutHandler = () => {
    localStorage.removeItem("persist:root");
    navigate("/");
    window.location.reload();
  };
  return (
    <Navbar className="border-b-2 ">
      <Link
        to={`/`}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-normal dark:text-white"
      >
        <span className="px-1 font-semibold">MERN</span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <div className="cursor-pointer text-2xl text-neutral-400 border rounded-full p-1 border-stone-400 lg:hidden">
        <AiOutlineSearch />
      </div>
      <div className="flex gap-3 justify-center items-center md:order-2">
        <div
          className="cursor-pointer text-xs border rounded-full p-2 border-stone-400 hidden sm:inline"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </div>
        {!currentUser ? (
          <Link to={`/signIn`}>
            <Button
              outline
              gradientDuoTone="purpleToPink"
              className="font-sans"
            >
              Sign In
            </Button>
          </Link>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.profile} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.name}</span>
              <span className="block text-sm">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={`/dashboard?tab=profile`}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logoutHandler}>Sign Out</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === `/`} as={`div`}>
          <Link to={`/`}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === `/news`} as={`div`}>
          <Link to={`/news`}>News</Link>
        </Navbar.Link>
        <Navbar.Link active={path === `/about`} as={`div`}>
          <Link to={`/about`}>About</Link>
        </Navbar.Link>

        <div className="mt-2 md:hidden">
          {theme === "light" ? (
            <div
              className="cursor-pointer text-xs border w-10 rounded-full py-2 pr-2 pl-1 ml-2  border-stone-400 "
              onClick={() => dispatch(toggleTheme())}
            >
              <FaMoon />
            </div>
          ) : (
            <div
              className="cursor-pointer text-xs border w-10 rounded-full py-2 pr-1 pl-5 ml-2 border-stone-400 "
              onClick={() => dispatch(toggleTheme())}
            >
              <FaSun />
            </div>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
