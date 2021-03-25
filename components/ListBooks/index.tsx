import BookCard from "./BookCard";
import { BookI } from "../../intefaces";
import Pagination from "../Pagination";

type Props = {
  books: Array<BookI>;
  numberOfBooks?: number;
  changePage?: (initial: number, end: number) => void;
};

const ListBooks: React.FC<Props> = ({ books, numberOfBooks, changePage }) => {
  return (
    <>
      <div className="listGrid">
        {books.map((book) => (
          <BookCard {...book} key={book.id} />
        ))}
      </div>
      {numberOfBooks ? (
        <Pagination numberOfBooks={numberOfBooks} changePage={changePage} />
      ) : null}
    </>
  );
};

export default ListBooks;
