import axiosConfig from "./axiosConfig";
import authConfig from "./authConfig";
import { OrderI } from "../intefaces";

export const getOrders = async (userId: string, token: string) => {
  try {
    const { data } = await axiosConfig.get<OrderI[]>(
      `/orders?_sort=createdAt:desc&user=${userId}`,
      authConfig(token)
    );
    return data;
  } catch (error) {
    return [];
  }
};
