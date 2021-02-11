import { GetServerSideProps } from "next";
import { BookI } from "../intefaces";
import { getBooksWithLimit, getBooksCount } from "../axios/bookApi";
import { isArrayNotEmpty } from "../utils";
import ListBooks from "../components/ListBooks";
import Empty from "../components/Empty";

type Props = {
  books: Array<BookI>;
  page: number;
  numberOfBooks: number;
};

const Books: React.FC<Props> = ({ books, page, numberOfBooks }) => {
  const booksExist = isArrayNotEmpty(books);

  return booksExist ? (
    <ListBooks books={books} page={page} numberOfBooks={numberOfBooks} />
  ) : (
    <Empty message="Something went wrong" />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1 },
}) => {
  const start = +page === 1 ? 0 : (+page - 1) * 15;
  const numberOfBooks = await getBooksCount();
  const books = await getBooksWithLimit(start);

  return {
    props: {
      books,
      page: +page,
      numberOfBooks,
    },
  };
};

export default Books;
