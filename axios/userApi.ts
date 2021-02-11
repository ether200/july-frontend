import axiosConfig from "./axiosConfig";
import authConfig from "./authConfig";
import { setCookie } from "nookies";
import { getTokenClientSide, logout } from "../utils";
import { RegisterFormValues } from "../components/Auth/RegisterForm";
import { LogFormValues } from "../components/Auth/LoginForm";
import { AccountFormValues } from "../components/AccountData/UserInfo/EditUserForm";
import { UserI } from "../intefaces";

export const registerUser = async (registerData: RegisterFormValues) => {
  try {
    const response = await axiosConfig.post(
      "/auth/local/register",
      registerData
    );
    setCookie(null, "jwt", response.data.jwt, {
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    return error.response
      ? error.response.data.message[0].messages[0].message
      : error.message;
  }
};

export const loginUser = async (logData: LogFormValues) => {
  try {
    const response = await axiosConfig.post("/auth/local", logData);
    setCookie(null, "jwt", response.data.jwt, {
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    return error.response
      ? error.response.data.message[0].messages[0].message
      : error.message;
  }
};

export const getMe = async (jwt: string) => {
  try {
    const { data } = await axiosConfig.get<UserI>("/users/me", authConfig(jwt));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfo = async (
  userId: string,
  formData: AccountFormValues
) => {
  try {
    const jwt = getTokenClientSide();

    if (!jwt) return;

    const response = await axiosConfig.put(
      `/users/${userId}`,
      formData,
      authConfig(jwt)
    );
    return response;
  } catch (error) {
    return error.response
      ? error.response.data.message[0].messages[0].message
      : error.message;
  }
};

export const fetchWithToken = (url, token) =>
  axiosConfig
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch(() => logout());
