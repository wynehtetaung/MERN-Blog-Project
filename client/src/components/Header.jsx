import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signInFailure } from "../redux/user/userSlice";
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  if (path == "/signIn" || path == "/signup") {
    dispatch(signInFailure(null));
  }
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
        <div className="cursor-pointer text-xs border rounded-full p-2 border-stone-400 hidden sm:inline">
          <FaMoon />
        </div>
        <Link to={`/signIn`}>
          <Button outline gradientDuoTone="purpleToPink" className="font-sans">
            Sign In
          </Button>
        </Link>
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
      </Navbar.Collapse>
    </Navbar>
  );
}
