export const checkEye = (check, id) => {
  if (!check) {
    document.getElementById(id).setAttribute("type", "text");
  } else {
    document.getElementById(id).setAttribute("type", "password");
  }
};
