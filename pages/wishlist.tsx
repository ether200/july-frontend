import useSWR from "swr";
import { getTokenServerSide, getIdUser, getTokenClientSide } from "../utils";
import { getFavoriteBooks, favBooksFetcher } from "../axios/favoriteApi";
import { FavoriteBookI } from "../intefaces";

// Components
import ListBooks from "../components/ListBooks";
import Empty from "../components/Empty";
import Seo from "../components/SEO";

type Props = {
  favoriteBooks: Array<FavoriteBookI>;
  userId: string;
};

const Wishlist: React.FC<Props> = ({ favoriteBooks, userId }) => {
  const jwt = getTokenClientSide();
  // initialize swr with favoriteBooks to revalidate on view
  const { data: favBooks } = useSWR<FavoriteBookI[]>(
    [`/favorites?user=${userId}`, jwt],
    favBooksFetcher,
    {
      initialData: favoriteBooks,
    }
  );

  const books = favBooks.map((book) => book.book);

  return (
    <>
      <Seo title="July | Wish List" />
      {favBooks.length ? (
        <ListBooks books={books} />
      ) : (
        <Empty message="Your wish list is empty" />
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  // Can't access page if user is not logged
  const token = getTokenServerSide(context);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  // Fetch for favoriteBooks
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
