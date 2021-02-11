import axiosConfig from "./axiosConfig";
import authConfig from "./authConfig";
import { getTokenClientSide } from "../utils";
import { AddressValues } from "../components/AccountData/AddressForm";
import { AddressI } from "../intefaces";

export const createAddress = async (adressData: AddressValues) => {
  try {
    const jwt = getTokenClientSide();

    if (!jwt) return;

    const { status } = await axiosConfig.post(
      "/addresses",
      adressData,
      authConfig(jwt)
    );

    return status;
  } catch (error) {
    return error.response ? error.response.data.message : error.message;
  }
};

export const updateAddress = async (
  idAddress: string,
  addressData: AddressValues
) => {
  try {
    const jwt = getTokenClientSide();

    if (!jwt) return;

    const { status } = await axiosConfig.put(
      `/addresses/${idAddress}`,
      addressData,
      authConfig(jwt)
    );

    return status;
  } catch (error) {
    return error.response ? error.response.data.message : error.message;
  }
};

export const getAddress = async (token: string, userId: string) => {
  try {
    const { data } = await axiosConfig.get<AddressI>(
      `/addresses?user=${userId}`,
      authConfig(token)
    );
    return data;
  } catch (error) {
    return [];
  }
};
