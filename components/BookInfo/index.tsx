import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { fetchWithToken } from "../../axios/userApi";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FiShoppingCart, FiHeart, FiCheck } from "react-icons/fi";
import { isProductInCart, addProductsCart } from "../../axios/cartApi";
import { deleteFavoriteBook, addFavoriteBook } from "../../axios/favoriteApi";
import { isArrayNotEmpty } from "../../utils";
import { FavoriteBookI, BookI } from "../../intefaces";

type Props = {
  book: BookI;
  favoriteBooks: FavoriteBookI[];
  userId: string;
  token: string;
};

const BookInfo: React.FC<Props> = ({ book, favoriteBooks, userId, token }) => {
  const router = useRouter();
  const { data: favBooks, isValidating, mutate } = useSWR<FavoriteBookI[]>(
    token ? [`/favorites?user=${userId}`, token] : null,
    fetchWithToken,
    {
      initialData: favoriteBooks,
      revalidateOnFocus: false,
    }
  );
  let currentFavBook = favBooks?.filter(
    (favBook) => favBook?.book?.id === book.id
  );
  let isFavorite = isArrayNotEmpty(currentFavBook);
  const [isItemOnCart, setIsItemOnCart] = useState<boolean>(
    isProductInCart(book.url)
  );

  const addBookToCart = (url) => {
    addProductsCart(url);
    setIsItemOnCart(true);
  };

  const favoriteHandler = async () => {
    if (!token) {
      router.push("/login");
    } else if (isFavorite) {
      mutate(
        favBooks.filter((item) => item.id !== currentFavBook[0].id),
        false
      );
      const status = await deleteFavoriteBook(currentFavBook[0].id);
      if (status === 200) {
        mutate();
      }
    } else {
      mutate([...favBooks, { book: { id: book.id } }], false);
      const status = await addFavoriteBook(userId, book.id);
      if (status === 200) {
        mutate();
      }
    }
  };

  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <div className="bookInfo">
        <div className="bookInfo__image">
          <Image
            alt="Book"
            src={book.poster.url}
            layout="intrinsic"
            width={400}
            height={600}
          />
        </div>
        <div className="bookInfo__info">
          <h1>{book.title}</h1>
          <p className="bookInfo__info__author">
            by {book.author} | {book.releaseDate}
          </p>
          <div className="bookInfo__info__price">
            <h5>Price</h5>
            <h3>${book.price}</h3>
          </div>
          <div className="bookInfo__info__btn-container">
            {isItemOnCart ? (
              <button className="btn btn--30p btn--disabled" disabled={true}>
                <span className="btn__text btn__text--capitalize">
                  <FiCheck /> This book is in your cart
                </span>
              </button>
            ) : (
              <button
                className="btn btn--30p"
                onClick={() => addBookToCart(book.url)}
              >
                <span className="btn__text btn__text--capitalize">
                  <FiShoppingCart /> Add to Cart
                </span>
              </button>
            )}
            <button
              className="btn btn--primary btn--30p"
              onClick={favoriteHandler}
              disabled={isValidating}
            >
              {" "}
              <span className="btn__text btn__text--capitalize">
                <FiHeart /> {isFavorite ? "remove" : "add to wish list"}
              </span>
            </button>
          </div>
          <div className="bookInfo__info__description">
            <h2>Description</h2>

            <div
              className="bookInfo__info__description__content"
              dangerouslySetInnerHTML={{ __html: book.summary }}
            />
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default BookInfo;
