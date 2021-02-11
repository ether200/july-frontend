import axiosConfig from "./axiosConfig";
import { CategoryI } from "../intefaces";

export const categoriesFetcher = (url) =>
  axiosConfig.get<CategoryI[]>(url).then((res) => res.data);
