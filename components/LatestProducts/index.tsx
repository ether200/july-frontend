import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { BookI } from "../../intefaces";

type Props = {
  latestBooks: BookI[];
};

const LatestProducts: React.FC<Props> = ({ latestBooks }) => {
  const settings = {
    dots: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="latestProducts">
      <h1>Latest Books</h1>
      <Slider {...settings}>
        {latestBooks.map((book) => (
          <Link href={`/books/${book.url}`} key={book.id}>
            <div className="latestProducts__card">
              <Image
                alt={book.title}
                src={book.poster.url}
                layout="fixed"
                width={300}
                height={450}
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default LatestProducts;
