import { GetServerSideProps } from "next";
import { getBooksByCategory } from "../../axios/bookApi";
import { isArrayNotEmpty } from "../../utils";
import ListBooks from "../../components/ListBooks";
import Empty from "../../components/Empty";

const Category = ({ books }) => {
  const booksExist = isArrayNotEmpty(books);

  return booksExist ? (
    <ListBooks books={books} />
  ) : (
    <Empty message="No books found for such category" />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const books = await getBooksByCategory(context.query.category);
  return {
    props: {
      books,
    },
  };
};

export default Category;
