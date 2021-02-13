import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { isArrayNotEmpty } from "../../../utils";
import { BookI, AddressI } from "../../../intefaces";
import Link from "next/link";
import PaymentForm from "./PaymentForm";

const STRIPE_TOKEN = process.env.NEXT_PUBLIC_STRAPI_KEY;

const stripePromise = loadStripe(STRIPE_TOKEN, {
  locale: "en",
});

type Props = {
  cartItems: Array<BookI> | null;
  addressInfo: Array<AddressI> | null;
  userId: string | null;
  totalPayment: number;
};

const Payment: React.FC<Props> = ({
  cartItems,
  addressInfo,
  userId,
  totalPayment,
}) => {
  const addressExist = isArrayNotEmpty(addressInfo);

  if (!addressExist) {
    return (
      <div className="payment">
        <h2>You must create an address</h2>
        <Link href="/my-account">
          <a>Go to account dashboard</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="payment">
      <h2>Payment</h2>
      <div className="payment__data">
        <Elements stripe={stripePromise}>
          <PaymentForm
            cartItems={cartItems}
            addressInfo={addressInfo}
            userId={userId}
            totalPayment={totalPayment}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
