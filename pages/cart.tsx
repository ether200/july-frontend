import { GetServerSideProps } from "next";
import { getSingleBook } from "../axios/bookApi";
import { getAddress } from "../axios/addressApi";
import { BookI, AddressI } from "../intefaces";
import { getCartServerSide, getTokenServerSide, getIdUser } from "../utils";

// Components
import Cart from "../components/Cart";
import Empty from "../components/Empty";
import Seo from "../components/SEO";

export type Props = {
  cartItems: Array<BookI> | null;
  addressInfo: Array<AddressI> | null;
  userId: string | null;
};

const CartPage: React.FC<Props> = ({ cartItems, addressInfo, userId }) => {

  return (
    <>
      <Seo title="July | My Cart" />
      {cartItems ? (
        <Cart cartItems={cartItems} addressInfo={addressInfo} userId={userId} />
      ) : (
        <Empty message="Your cart is empty" />
      )}
    </>
  );
};

// Fetch for cart items on each request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // cart is a string with all items separated with a comma
  const cart = getCartServerSide(context);
  const token = getTokenServerSide(context);

  if (cart) {
    // if there's any item it's gonna fetch them singularly
    const cartArray = cart.split(",");
    const cartPromise = await Promise.all(cartArray.map(item => getSingleBook(item)));
    const cartItems = cartPromise.map((cartItem) => {
      return {...cartItem[0]}
    });
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
    // otherwise it'll just return the items without user info
    return {
      props: {
        cartItems,
        addressInfo: null,
        userId: null,
      },
    };
  }

  // lastly if there's no items in the cart, it will return nothing, making the component render a message
  return {
    props: {
      cartItems: null,
      addressInfo: null,
      userId: null,
    },
  };
};

export default CartPage;
