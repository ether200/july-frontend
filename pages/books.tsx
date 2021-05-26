import { useState } from "react";
import { GetStaticProps } from "next";
import { getBooksCount, getAllBooks } from "../axios/bookApi";
import { BookI } from "../intefaces";

// Components
import ListBooks from "../components/ListBooks";
import Empty from "../components/Empty";
import Seo from "../components/SEO";

type Props = {
  books: Array<BookI>;
  numberOfBooks: number;
};

const Books: React.FC<Props> = ({ books, numberOfBooks }) => {
  // Pass partial books to <listBooks /> to make use of pagination
  const [partialBooks, setPartialBooks] = useState(books.slice(0, 15));

  const changePartialBooks = (start: number, end: number) =>
    setPartialBooks(books.slice(start, end));

  return (
    <>
      <Seo title="July | Store" />
      {books.length ? (
        <ListBooks
          books={partialBooks}
          numberOfBooks={numberOfBooks}
          changePage={changePartialBooks}
        />
      ) : (
        <Empty message="Something went wrong" />
      )}
    </>
  );
};

// Get all the books from api on build time
export const getStaticProps: GetStaticProps = async () => {
  const numberOfBooks = await getBooksCount();
  const books = await getAllBooks();

  return {
    props: {
      books,
      numberOfBooks,
    },
    revalidate: 600,
  };
};

export default Books;
