import { getTokenServerSide } from "../utils";
import { GetServerSideProps } from "next";
import LoginForm from "../components/Auth/LoginForm";

export const login = () => {
  return <LoginForm />;
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

export default login;
