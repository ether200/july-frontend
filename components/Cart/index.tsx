import { BookI, AddressI } from "../../intefaces";

// Components
import CartItem from "./CartItem";
import Payment from "./Payment";

export type Props = {
  cartItems: Array<BookI> | null;
  addressInfo: Array<AddressI> | null;
  userId: string | null;
};

const Cart: React.FC<Props> = ({ cartItems, addressInfo, userId }) => {
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);

  return (
    <div className="cart">
      <div className="cart__center">
        <h2>Your cart</h2>
        <div className="cart__center__grid">
          <div className="cart__center__grid__firstRow">
            <h3>Book</h3>
            <h3>Price</h3>
          </div>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="cart__center__grid__lastRow">
            <h3>total: ${totalPrice}</h3>
          </div>
        </div>
        {/* Only show <Payment /> if user is logged */}
        {userId && (
          <Payment
            cartItems={cartItems}
            addressInfo={addressInfo}
            userId={userId}
            totalPayment={+totalPrice}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
