import { GetServerSideProps } from "next";
import { BookI } from "../intefaces";
import { searchForBooks } from "../axios/bookApi";
import ListBooks from "../components/ListBooks";
import Empty from "../components/Empty";
import Seo from "../components/SEO";

type Props = {
  books: BookI[];
};

const search: React.FC<Props> = ({ books }) => {
  return books.length ? (
    <>
      <Seo />
      <ListBooks books={books} />
    </>
  ) : (
    <>
      <Seo />
      <Empty message="NO RESULTS" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query._q;
  const books = await searchForBooks(query);
  return {
    props: {
      books,
    },
  };
};

export default search;
