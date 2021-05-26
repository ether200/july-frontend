import { GetStaticProps } from "next";
import { getLatestBooks } from "../axios/bookApi";
import { BookI } from "../intefaces";

// Components
import Seo from "../components/SEO";
import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";
import Services from "../components/Services";

type Props = {
  latestBooks: BookI[];
};

const Home: React.FC<Props> = ({ latestBooks }) => {
  return (
    <div className="container">
      <Seo />
      <Hero />
      <LatestProducts latestBooks={latestBooks} />
      <Services />
    </div>
  );
};

// Fetch for latest books on build time
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
