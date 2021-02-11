import { Props } from "../../pages/orders";
import OrderCard from "./OrderCard";

const Orders: React.FC<Props> = ({ orders }) => {
  return (
    <div className="order">
      <h2>Orders</h2>
      <div className="order__grid">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
