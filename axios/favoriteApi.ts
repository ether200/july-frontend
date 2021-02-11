import axiosConfig from "./axiosConfig";
import authConfig from "./authConfig";
import { getTokenClientSide, logout } from "../utils";
import { FavoriteBookI } from "../intefaces";

export const getFavoriteBooks = async (jwt: string, userId: string) => {
  try {
    const response = await axiosConfig.get<FavoriteBookI[]>(
      `/favorites?user=${userId}`,
      authConfig(jwt)
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export const addFavoriteBook = async (idUser: string, idBook: string) => {
  try {
    const jwt = getTokenClientSide();
    const response = await axiosConfig.post(
      `/favorites`,
      { user: idUser, book: idBook },
      authConfig(jwt)
    );
    return response.status;
  } catch (error) {
    logout();
  }
};

export const deleteFavoriteBook = async (favBookId: string) => {
  try {
    if (!favBookId) return;
    const jwt = getTokenClientSide();
    const response = await axiosConfig.delete(
      `/favorites/${favBookId}`,
      authConfig(jwt)
    );

    return response.status;
  } catch (error) {
    logout();
  }
};

export const favBooksFetcher = (url: string, token: string) =>
  axiosConfig
    .get<FavoriteBookI[]>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch(() => []);
