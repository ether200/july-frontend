import { BookI } from "../intefaces";
import axiosConfig from "./axiosConfig";

export const getAllBooks = async () => {
  try {
    const { data } = await axiosConfig.get<BookI[]>("/books");
    return data;
  } catch (error) {
    return [];
  }
};

export const getBooksWithLimit = async (start: number) => {
  try {
    const { data } = await axiosConfig.get<BookI[]>(
      `/books?_limit=15&_start=${start}`
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const getBooksByCategory = async (category: string | string[]) => {
  try {
    const { data } = await axiosConfig.get<BookI[]>(
      `/books?category.url=${category}`
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const getBooksCount = async () => {
  try {
    const { data } = await axiosConfig.get("/books/count");
    return data;
  } catch (error) {
    return null;
  }
};

export const getSingleBook = async (bookUrl: string | string[]) => {
  try {
    const { data } = await axiosConfig.get<BookI[]>(`/books?url=${bookUrl}`);

    return data;
  } catch (error) {
    return [];
  }
};

export const searchForBooks = async (query: string | string[]) => {
  try {
    const { data } = await axiosConfig.get<BookI[]>(`/books?_q=${query}`);
    return data;
  } catch (error) {
    return [];
  }
};

export const getLatestBooks = async () => {
  try {
    const { data } = await axiosConfig.get<BookI[]>(
      "books?_sort=releaseDate:desc&_limit=8"
    );
    return data;
  } catch (error) {
    return [];
  }
};
