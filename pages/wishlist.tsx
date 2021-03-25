import { getTokenServerSide, getIdUser, getTokenClientSide } from "../utils";
import useSWR from "swr";
import { getFavoriteBooks, favBooksFetcher } from "../axios/favoriteApi";
import { FavoriteBookI } from "../intefaces";
import ListBooks from "../components/ListBooks";
import Empty from "../components/Empty";
import Seo from "../components/SEO";

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
