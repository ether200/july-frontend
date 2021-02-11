import { GetServerSideProps } from "next";
import { getSingleBook } from "../axios/bookApi";
import { getCartServerSide, getTokenServerSide, getIdUser } from "../utils";
import { getAddress } from "../axios/addressApi";
import { BookI, AddressI } from "../intefaces";
import Cart from "../components/Cart";
import Empty from "../components/Empty";

export type Props = {
  cartItems: Array<BookI> | null;
  addressInfo: Array<AddressI> | null;
  userId: string | null;
};

const CartPage: React.FC<Props> = ({ cartItems, addressInfo, userId }) => {
  return cartItems ? (
    <Cart cartItems={cartItems} addressInfo={addressInfo} userId={userId} />
  ) : (
    <Empty message="Your cart is empty" />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cart = getCartServerSide(context);
  const token = getTokenServerSide(context);

  if (cart) {
    let cartItems = [];
    const cartArray = cart.split(",");
    for await (const product of cartArray) {
      const book = await getSingleBook(product);
      cartItems = [...cartItems, ...book];
    }
    if (token) {
      const userId = getIdUser(token);
      const addressInfo = await getAddress(token, userId);

      return {
        props: {
          cartItems,
          addressInfo,
          userId,
        },
      };
    }
    return {
      props: {
        cartItems,
        addressInfo: null,
        userId: null,
      },
    };
  }

  return {
    props: {
      cartItems: null,
      addressInfo: null,
      userId: null,
    },
  };
};

export default CartPage;
