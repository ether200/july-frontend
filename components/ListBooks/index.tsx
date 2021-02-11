import BookCard from "./BookCard";
import { BookI } from "../../intefaces";
import Pagination from "../Pagination";

type Props = {
  books: Array<BookI>;
  page?: number;
  numberOfBooks?: number;
};

const ListBooks: React.FC<Props> = ({ books, page, numberOfBooks }) => {
  return (
    <>
      <div className="listGrid">
        {books.map((book) => (
          <BookCard {...book} key={book.id} />
        ))}
      </div>
      {page && numberOfBooks ? (
        <Pagination page={page} numberOfBooks={numberOfBooks} />
      ) : null}
    </>
  );
};

export default ListBooks;
