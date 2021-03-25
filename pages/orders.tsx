import { GetServerSideProps } from "next";
import { getOrders } from "../axios/orderApi";
import { getTokenServerSide, getIdUser } from "../utils";
import { OrderI } from "../intefaces";
import Orders from "../components/Orders";
import Empty from "../components/Empty";
import Seo from "../components/SEO";

export type Props = {
  orders: Array<OrderI>;
};

const OrdersPage: React.FC<Props> = ({ orders }) => {
  return (
    <>
      <Seo title="July | My Orders" />
      {orders.length ? (
        <Orders orders={orders} />
      ) : (
        <Empty message="You haven't made any order yet" />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getTokenServerSide(context);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const userId = getIdUser(token);
  const orders = await getOrders(userId, token);
  return {
    props: {
      orders,
    },
  };
};

export default OrdersPage;
