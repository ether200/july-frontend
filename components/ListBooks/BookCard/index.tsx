import { useState } from "react";
import { useRouter } from "next/router";
import { BookI } from "../../../intefaces";
import Image from "next/image";

const BookCard: React.FC<BookI> = ({
  author,
  title,
  url: slug,
  poster: url,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const routerHandler = () => {
    if (isLoading) return;
    setIsLoading((loading) => !loading);
    router.push(`/books/${slug}`);
  };

  return (
    <div className="list__grid__card" onClick={routerHandler}>
      <div
        className={
          isLoading
            ? "list__grid__card__modal"
            : "list__grid__card__modal--hidden"
        }
      >
        <p>Loading...</p>
      </div>
      <Image
        alt="book"
        src={url.url}
        layout="intrinsic"
        width={300}
        height={400}
      />
      <div className="list__grid__card__content">
        <div className="list__grid__card__content__title">
          <h4>{title}</h4>
        </div>
        <p>
          by <span>{author}</span>
        </p>
      </div>
    </div>
  );
};

export default BookCard;
