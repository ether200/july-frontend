import nookies, { parseCookies, destroyCookie } from "nookies";
import jwt_decode from "jwt-decode";
import { TokenI } from "../intefaces";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export const getTokenServerSide = (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  return cookies.jwt ? cookies.jwt : null;
};

export const getTokenClientSide = () => {
  const cookies = parseCookies();
  return cookies.jwt ? cookies.jwt : null;
};

export const getIdUser = (token: string) => {
  if (!token) {
    return;
  }
  const { id } = jwt_decode<TokenI>(token);
  return id;
};

export const getCartServerSide = (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  return cookies.cart ? cookies.cart : null;
};

export const getCartClientSide = () => {
  const cookies = parseCookies();
  return cookies.cart ? cookies.cart : null;
};

export const logout = () => {
  const router = useRouter();
  destroyCookie(null, "jwt");
  router.push("/");
};

export const isArrayNotEmpty = (arr: any[]) => (arr?.length > 0 ? true : false);
