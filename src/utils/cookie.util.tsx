import cookie from "cookie";

export function hasUserToken(): boolean {
  const cookies = cookie.parse(document.cookie);
  return !!cookies.userToken;
}
