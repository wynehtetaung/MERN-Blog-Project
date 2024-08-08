import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { checkEye } from "../utils/utils";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import GoogleLogin from "../components/GoogleLogin";

export default function SignIn() {
  const [eye, setEye] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const {
    loading: isLoading,
    google: checkGoogle,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      dispatch(signInStart());
      const { status, data } = await axios.post(
        `/api/auth/signin`,
        {
          email: emailRef.current.value.trim(),
          password: passwordRef.current.value.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (status === 200) {
        dispatch(signInSuccess(data.resource));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      dispatch(
        signInFailure({
          color: "failure",
          message: error.response.data.message,
          time: 4000,
        })
      );
    }
  };

  return (
    <div className="min-h-screen mt-20 ">
      {errorMessage && (
        <div className="mb-6 flex justify-center">
          <AlertMessage state={errorMessage} />
        </div>
      )}
      <div className="flex flex-col justify-center gap-10 items-center md:flex-row lg:gap-36 md:gap-20 md:pt-20">
        <div className="w-full px-4 md:w-2/6">
          <Link to={`/`} className="text-4xl font-normal dark:text-white">
            <span className="px-1 font-semibold ">MERN</span>
            Blog
          </Link>
          <p className="mt-3 text-sm text-neutral-600 font-medium pl-1 capitalize">
            you can sign up with your email and password or google.
          </p>
        </div>
        <div className="w-full px-4 md:w-2/6 select-none">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <FloatingLabel
              ref={emailRef}
              type="email"
              required
              variant="outlined"
              label="Enter Your Email"
            />

            <div className="relative">
              <FloatingLabel
                ref={passwordRef}
                onChange={(e) => {
                  e.target.value.length > 0
                    ? setShowEye(true)
                    : setShowEye(false);
                }}
                type="password"
                required
                variant="outlined"
                label="Enter Your Password"
                id="password"
              />
              {showEye && (
                <div
                  className="absolute top-4  right-4 cursor-pointer text-[18px]"
                  onClick={() => {
                    setEye(!eye);
                    checkEye(eye, "password");
                  }}
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              )}
            </div>
            <div>
              <Button
                type="submit"
                className="w-full mx-auto mt-3 font-sans "
                gradientDuoTone="purpleToPink"
                disabled={isLoading}
              >
                {isLoading && !checkGoogle ? (
                  <>
                    <Spinner size={`sm`} color={`purple`} />
                    <span className="pl-3">Loading</span>
                  </>
                ) : (
                  "Sing In"
                )}
              </Button>
              <GoogleLogin isLoading={isLoading} checkGoogle={checkGoogle} />
              <div className="text-sm mt-3">
                <span className="font-sans">Don&apos;t have an account?</span>
                <Link
                  to={`/signup`}
                  className="ml-2 text-blue-700 cursor-pointer hover:text-blue-400"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
