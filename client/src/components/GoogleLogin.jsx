/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Button, Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function GoogleLogin({ isLoading, checkGoogle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signInHandler = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        dispatch(signInStart(true));
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            headers: {
              Authorization: `${response.token_type} ${response.access_token}`,
            },
          }
        );
        const res = await axios.post(
          `api/auth/google-login`,
          {
            name: data.name,
            email: data.email,
            password: data.sub,
            profile: data.picture,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (res.status === 201 || res.status === 200) {
          dispatch(signInSuccess(res.data.resource));
          navigate("/");
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
    },
  });

  return (
    <>
      <Button
        type="button"
        className="w-full mx-auto mt-3 font-sans "
        gradientDuoTone={`pinkToOrange`}
        outline
        onClick={signInHandler}
        disabled={isLoading}
      >
        {isLoading && checkGoogle ? (
          <>
            <Spinner size={`sm`} color={`purple`} />
            <span className="pl-3">Loading</span>
          </>
        ) : (
          <>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue With Google
          </>
        )}
      </Button>
    </>
  );
}
