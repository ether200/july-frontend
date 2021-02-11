import axiosConfig from "./axiosConfig";
import { AboutI } from "../intefaces";

export const getAboutInfo = async () => {
  try {
    const { data } = await axiosConfig.get<AboutI>("/about-page");
    return data;
  } catch (error) {
    return null;
  }
};
