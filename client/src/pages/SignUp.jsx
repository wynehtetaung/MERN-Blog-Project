import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { checkEye } from "../utils/utils";

export default function SignUp() {
  const [eye, setEye] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex flex-col justify-center gap-10 items-center md:flex-row lg:gap-36 md:gap-20 md:pt-20">
        <div className="w-1/2 md:w-2/6">
          <Link to={`/`} className="text-4xl font-normal dark:text-white">
            <span className="px-1 font-semibold">MERN</span>
            Blog
          </Link>
          <p className="mt-3 text-sm text-neutral-600 font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
            fugiat, asperiores deleniti illum commodi quia.
          </p>
        </div>
        <div className="w-1/2 md:w-2/6 select-none">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(passwordRef.current.value);
            }}
          >
            <div className="">
              <Label value="Enter Name" />
              <TextInput
                ref={nameRef}
                type="text"
                placeholder="Your Name"
                id="name"
                required
              />
            </div>
            <div className="">
              <Label value="Enter Email" />
              <TextInput
                ref={emailRef}
                type="email"
                placeholder="Your Email"
                id="email"
                required
              />
            </div>
            <div className="relative">
              <Label value="Enter Password" />
              <TextInput
                ref={passwordRef}
                onChange={(e) =>
                  e.target.value ? setShowEye(true) : setShowEye(false)
                }
                type="password"
                placeholder="Your Password"
                required
                id="password"
              />
              {showEye && (
                <span
                  className="absolute top-9 right-5 cursor-pointer text-lg"
                  onClick={() => {
                    setEye(!eye);
                    checkEye(eye, "password");
                  }}
                >
                  {eye ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full mx-auto mt-3 font-sans "
              gradientDuoTone="purpleToPink"
            >
              Sing Up
            </Button>
            <div className="text-sm ">
              <span className="font-sans">Have an account?</span>
              <Link
                to={`/signIn`}
                className="ml-2 text-blue-700 cursor-pointer hover:text-blue-400"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
