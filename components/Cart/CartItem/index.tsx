import Image from "next/image";
import { useRouter } from "next/router";
import { removeProductCart } from "../../../axios/cartApi";
import { BookI } from "../../../intefaces";

const CartItem: React.FC<BookI> = ({ poster, title, author, price, url }) => {
  const router = useRouter();

  const onClickHandler = (slug: string) => {
    removeProductCart(slug);
    router.replace(router.asPath);
  };

  return (
    <div className="cart__item">
      <div className="cart__item__image">
        <Image
          alt="Book Cover"
          src={poster.url}
          layout="fixed"
          width={150}
          height={200}
        />
      </div>
      <div className="cart__item__title">
        <div>
          <h3>{title}</h3>
          <h3>By: {author}</h3>
        </div>
        <div className="cart__item__title__btn-container">
          <button
            className="btn btn--primary btn--15p"
            onClick={() => onClickHandler(url)}
          >
            <span className="btn__text">Remove</span>
          </button>
        </div>
      </div>
      <div className="cart__item__price">
        <h3 className="cart__item__price__text">PRICE: </h3>
        <h3>$ {price}</h3>
      </div>
    </div>
  );
};

export default CartItem;
