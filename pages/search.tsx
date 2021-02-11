import { GetServerSideProps } from "next";
import { BookI } from "../intefaces";
import { searchForBooks } from "../axios/bookApi";
import { isArrayNotEmpty } from "../utils";
import ListBooks from "../components/ListBooks";
import Empty from "../components/Empty";

type Props = {
  books: BookI[];
};

const search: React.FC<Props> = ({ books }) => {
  const booksExist = isArrayNotEmpty(books);

  return booksExist ? (
    <ListBooks books={books} />
  ) : (
    <Empty message="NO RESULTS" />
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
