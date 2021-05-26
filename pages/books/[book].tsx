import { GetServerSideProps } from "next";
import { getTokenServerSide, getIdUser } from "../../utils";
import { BookI, FavoriteBookI } from "../../intefaces";
import { getSingleBook } from "../../axios/bookApi";
import { getFavoriteBooks } from "../../axios/favoriteApi";

// Components
import BookInfo from "../../components/BookInfo";
import Empty from "../../components/Empty";
import Seo from "../../components/SEO";

type Props = {
  book: BookI;
  favoriteBooks: FavoriteBookI[];
  userId: string;
  token: string;
};

const BookPage: React.FC<Props> = ({ book, favoriteBooks, userId, token }) => {
  if (!book) {
    return <Empty message="404 | Book not found" />;
  }

  return (
    <>
      <Seo title={`July | ${book.title}`} />
      <BookInfo
        book={book}
        favoriteBooks={favoriteBooks}
        userId={userId}
        token={token}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getTokenServerSide(context);

  // Fetch single book
  const data = await getSingleBook(context.query.book);
  const book = data.length === 0 ? null : data[0];

  // If user is logged, fetch for favorite books and return them along with user info
  if (token) {
    const userId = getIdUser(token);
    const favoriteBooks = await getFavoriteBooks(token, userId);
    return {
      props: {
        book,
        favoriteBooks,
        userId,
        token,
      },
    };
  } else {
    return {
      props: {
        book,
      },
    };
  }
};

export default BookPage;
