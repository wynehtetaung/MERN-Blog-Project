import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { checkEye } from "../utils/utils";
import { passwordStrength } from "check-password-strength";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";
import GoogleLogin from "../components/GoogleLogin";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [eye, setEye] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loading: googleLoading, google: checkGoogle } = useSelector(
    (state) => state.user
  );
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const { status } = await axios.post(
        `/api/auth/signup`,
        {
          name: nameRef.current.value.trim(),
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
      if (status === 201) {
        navigate("/signIn");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setAlertMessage({
          color: "failure",
          message: "Account is already exists",
          time: 3000,
        });
        setIsLoading(false);
        return false;
      }
      setAlertMessage({
        color: "failure",
        message: error.response.data.message,
        time: 3000,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen mt-20 ">
      {alertMessage && (
        <div className="mb-6 flex justify-center">
          <AlertMessage state={alertMessage} setState={setAlertMessage} />
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
              ref={nameRef}
              type="text"
              required
              variant="outlined"
              label="Enter Your Name"
            />

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
                  e.target.value.length > 0
                    ? setPasswordStrengthMessage(
                        passwordStrength(e.target.value).value
                      )
                    : setPasswordStrengthMessage(null);
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
              {passwordStrengthMessage && (
                <p
                  className={`text-xs mt-1 capitalize 
                    ${
                      passwordStrengthMessage.toLowerCase() === "too weak"
                        ? "text-red-700"
                        : passwordStrengthMessage.toLowerCase() === "weak"
                        ? "text-red-500"
                        : passwordStrengthMessage.toLowerCase() === "medium"
                        ? "text-yellow-400"
                        : "text-green-600"
                    }`}
                >
                  {" "}
                  your password is {passwordStrengthMessage}
                </p>
              )}
            </div>
            <div>
              <Button
                type="submit"
                className="w-full mx-auto mt-3 font-sans "
                gradientDuoTone="purpleToPink"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size={`sm`} color={`purple`} />
                    <span className="pl-3">Loading</span>
                  </>
                ) : (
                  "Sing Up"
                )}
              </Button>
              <GoogleLogin
                isLoading={googleLoading}
                checkGoogle={checkGoogle}
              />
              <div className="text-sm mt-3">
                <span className="font-sans">Have an account?</span>
                <Link
                  to={`/signIn`}
                  className="ml-2 text-blue-700 cursor-pointer hover:text-blue-400"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
