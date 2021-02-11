import Image from "next/image";
import Link from "next/link";
import { BookI } from "../../../intefaces";

const BookCard: React.FC<BookI> = ({
  author,
  title,
  url: slug,
  poster: url,
}) => {
  return (
    <Link href={`/books/${slug}`}>
      <a>
        <div className="listGrid__card">
          <Image
            alt="book"
            src={url.url}
            layout="intrinsic"
            width={300}
            height={400}
          />
          <div className="listGrid__card__content">
            <div className="listGrid__card__content__title">
              <h4>{title}</h4>
            </div>
            <p>
              by <span>{author}</span>
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BookCard;
