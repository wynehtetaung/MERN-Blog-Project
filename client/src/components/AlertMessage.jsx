import { Alert } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInFailure } from "../redux/user/userSlice";

/* eslint-disable react/prop-types */
export default function AlertMessage({ state, setState }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  setTimeout(() => {
    setShow(false);
    setState(null);
    dispatch(signInFailure(null));
  }, state.time);
  return show && <Alert color={state.color}>{state.message}</Alert>;
}
