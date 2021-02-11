import { getTokenServerSide } from "../utils";
import { GetServerSideProps } from "next";
import RegisterForm from "../components/Auth/RegisterForm";

const register = () => {
  return <RegisterForm />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (getTokenServerSide(context)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};

export default register;
