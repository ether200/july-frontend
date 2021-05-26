import { getTokenServerSide } from "../utils";
import { GetServerSideProps } from "next";

// Components
import LoginForm from "../components/Auth/LoginForm";
import Seo from "../components/SEO";

export const login = () => {
  return (
    <>
      <Seo title="July | Login" />
      <LoginForm />
    </>
  );
};

// if there user is logged it will redirect to home page
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
