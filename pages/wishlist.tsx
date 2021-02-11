import {
  getTokenServerSide,
  getIdUser,
  isArrayNotEmpty,
  getTokenClientSide,
} from "../utils";
import useSWR from "swr";
import { getFavoriteBooks, favBooksFetcher } from "../axios/favoriteApi";
import { FavoriteBookI } from "../intefaces";
import ListBooks from "../components/ListBooks";
import Empty from "../components/Empty";

type Props = {
  favoriteBooks: Array<FavoriteBookI>;
  userId: string;
};

const Wishlist: React.FC<Props> = ({ favoriteBooks, userId }) => {
  const jwt = getTokenClientSide();
  const { data: favBooks } = useSWR<FavoriteBookI[]>(
    [`/favorites?user=${userId}`, jwt],
    favBooksFetcher,
    {
      initialData: favoriteBooks,
    }
  );

  const favoriteBooksExist = isArrayNotEmpty(favoriteBooks);
  const books = favBooks.map((book) => book.book);

  return favoriteBooksExist ? (
    <ListBooks books={books} />
  ) : (
    <Empty message="Your wish list is empty" />
  );
};

export const getServerSideProps = async (context) => {
  const token = getTokenServerSide(context);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const userId = getIdUser(token);
  const favoriteBooks = await getFavoriteBooks(token, userId);

  return {
    props: {
      favoriteBooks,
      userId,
    },
  };
};

export default Wishlist;
