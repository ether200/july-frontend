import { getSingleBook } from "../../axios/bookApi";
import { getTokenServerSide, getIdUser } from "../../utils";
import { getFavoriteBooks } from "../../axios/favoriteApi";
import { GetServerSideProps } from "next";
import BookInfo from "../../components/BookInfo";
import Empty from "../../components/Empty";
import Seo from "../../components/SEO";
import { BookI, FavoriteBookI } from "../../intefaces";

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

  const data = await getSingleBook(context.query.book);
  const book = data.length === 0 ? null : data[0];

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
