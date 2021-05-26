import { GetServerSideProps } from "next";
import { getBooksByCategory } from "../../axios/bookApi";
import { BookI } from "../../intefaces";

// Components
import ListBooks from "../../components/ListBooks";
import Empty from "../../components/Empty";
import Seo from "../../components/SEO";

type Props = {
  books: BookI[];
  category: string;
};

const Category: React.FC<Props> = ({ books, category }) => {
  // Capitalize category for <Seo />
  const categoryWithSpaces = category.split("-").join(" ");
  const categoryCapitalized =
    categoryWithSpaces.charAt(0).toUpperCase() + categoryWithSpaces.slice(1);

  return (
    <>
      <Seo title={`July | ${categoryCapitalized}`} />
      {books.length ? (
        <ListBooks books={books} />
      ) : (
        <Empty message="No books found for such category" />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch for books by category from query
  const category = context.query.category;
  const books = await getBooksByCategory(category);
  return {
    props: {
      books,
      category,
    },
  };
};

export default Category;
