import { getTokenServerSide } from "../utils";
import { GetServerSideProps } from "next";
import RegisterForm from "../components/Auth/RegisterForm";
import Seo from "../components/SEO";

const register = () => {
  return (
    <>
      <Seo title="July | Register" />
      <RegisterForm />;
    </>
  );
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
