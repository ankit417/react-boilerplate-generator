import Cookies from "universal-cookie";

const cookies = new Cookies();

// TO SET COOKIES
export function setCookie(key, value) {
  cookies.set([key], value, { path: "/" });
}

// TO GET VALUES
export function getCookie(key) {
  return cookies.get([key]);
}

// TO CLEAR THE COOKIE
export function removeCookie(key) {
  cookies.remove([key], { path: "/" });
}