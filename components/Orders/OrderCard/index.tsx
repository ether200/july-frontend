import Link from "next/link";
import { OrderI } from "../../../intefaces";

type Props = {
  order: OrderI;
};

const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <div className="order__grid__card">
      <div className="order__grid__card__section">
        <h4>Order:</h4>
        <p>{order.id}</p>
      </div>
      <div className="order__grid__card__section">
        <h4>Shipping Address:</h4>
        <p>
          {order.addressShipping.address} | {order.addressShipping.city} |{" "}
          {order.addressShipping.state}
        </p>
      </div>
      <div className="order__grid__card__section">
        <h4>Items:</h4>
        <ul>
          {order.books.map((book) => (
            <li key={book.id}>
              <Link href={`/${book.url}`}>
                <a>{book.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="order__grid__card__section">
        <h4>Total Payment:</h4>
        <p>$ {order.totalPayment}</p>
      </div>
    </div>
  );
};

export default OrderCard;
