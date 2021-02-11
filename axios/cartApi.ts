import axiosConfig from "./axiosConfig";
import authConfig from "./authConfig";
import { setCookie, destroyCookie } from "nookies";
import { getCartClientSide, getTokenClientSide } from "../utils";

export const getProductsCart = () => {
  const cart = getCartClientSide();
  if (!cart) {
    return null;
  } else {
    return cart.split(",");
  }
};

export const addProductsCart = (product: string) => {
  const cart = getProductsCart();

  if (!cart) {
    setCookie(null, "cart", product, {
      maxAge: 30 * 24 * 60 * 60,
    });
  } else {
    destroyCookie(null, "cart");
    cart.push(product);
    setCookie(null, "cart", cart.join(","), {
      maxAge: 30 * 24 * 60 * 60,
    });
  }
};

export const removeProductCart = (product: string) => {
  const cart = getProductsCart();
  const newCart = cart.filter((item) => item !== product);
  destroyCookie(null, "cart");
  setCookie(null, "cart", newCart.join(","), {
    maxAge: 30 * 24 * 60 * 60,
  });
};

export const emptyCart = () => {
  destroyCookie(null, "cart");
};

export const isProductInCart = (product: string) => {
  const cart = getProductsCart();
  if (!cart) {
    return;
  } else {
    return cart.some((bookUrl) => product === bookUrl);
  }
};

export const paymentCart = async (
  tokenPayment,
  books,
  idUser,
  addressShipping,
  totalPayment
) => {
  try {
    const jwt = getTokenClientSide();
    delete addressShipping.user;
    const newOrder = {
      token: tokenPayment,
      products: books,
      idUser,
      totalPayment,
      addressShipping,
    };
    const response = await axiosConfig.post(
      "/orders",
      newOrder,
      authConfig(jwt)
    );
    return response;
  } catch (error) {
    return error.response ? error.response.data.message : error.message;
  }
};
