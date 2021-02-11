import { useState } from "react";
import { useRouter } from "next/router";
import { Props } from "../../";
import { paymentCart, emptyCart } from "../../../../axios/cartApi";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm: React.FC<Props> = ({ addressInfo, cartItems, userId }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [stripeError, setStripeError] = useState<null | string>(null);
  const products = cartItems.map((item) => item.id);
  const totalPayment = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      setStripeError(result.error.message);
    } else {
      setLoading(true);
      setStripeError(null);
      const response = await paymentCart(
        result.token,
        products,
        userId,
        addressInfo[0],
        totalPayment
      );

      if (response.status < 300) {
        emptyCart();
        router.push("/orders");
      } else {
        setStripeError(response);
      }

      setLoading(false);
    }
  };

  return (
    <>
      {stripeError && <h5 className="error">{stripeError}</h5>}
      <form className="payment__data__form" onSubmit={handleSubmit}>
        <CardElement
          options={{
            hidePostalCode: true,
          }}
        />
        <div className="payment__data__form__btn-container">
          <button
            className={!loading ? "btn btn--25p" : "btn btn--25p btn--loading"}
            type="submit"
          >
            <span className="btn__text">Pay</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
