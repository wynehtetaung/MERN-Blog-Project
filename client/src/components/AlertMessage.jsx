import { Alert } from "flowbite-react";
import { useState } from "react";

/* eslint-disable react/prop-types */
export default function AlertMessage({ state }) {
  const [show, setShow] = useState(true);
  setTimeout(() => {
    setShow(false);
  }, state.time);
  return show && <Alert color={state.color}>{state.message}</Alert>;
}
