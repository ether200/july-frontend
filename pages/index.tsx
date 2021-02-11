import { GetStaticProps } from "next";
import { getLatestBooks } from "../axios/bookApi";
import Head from "next/head";
import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";
import Services from "../components/Services";
import { BookI } from "../intefaces";

import { getBooksCount } from "../axios/bookApi";

type Props = {
  latestBooks: BookI[];
};

const Home: React.FC<Props> = ({ latestBooks }) => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <LatestProducts latestBooks={latestBooks} />
      <Services />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const latestBooks = await getLatestBooks();
  return {
    props: {
      latestBooks,
    },
    revalidate: 900,
  };
};

export default Home;
