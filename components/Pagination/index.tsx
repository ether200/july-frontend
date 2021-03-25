import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";

type Props = {
  numberOfBooks: number;
  changePage?: (initial: number, end: number) => void;
};

const Pagination: React.FC<Props> = ({ numberOfBooks, changePage }) => {
  const router = useRouter();
  const totalPages = Math.ceil(numberOfBooks / 15);
  const [page, setPage] = useState<number>(1);

  const onClickHandler = (
    initial: number,
    end: number,
    currentPage: number
  ) => {
    changePage(initial, end);
    if (currentPage) {
      setPage(currentPage);
    }
    window.scrollTo(0, 0);
  };
  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <ul className="pagination">
        <li>
          <button
            className="pagination__text"
            disabled={page <= 1}
            onClick={() => {
              const initial = (page - 2) * 15;
              const end = (page - 1) * 15;
              const newPage = page - 1;
              onClickHandler(initial, end, newPage);
            }}
          >
            <MdNavigateBefore /> Prev
          </button>
        </li>
        {renderButtons(totalPages, onClickHandler, page)}
        <li>
          <button
            className="pagination__text"
            disabled={page >= totalPages}
            onClick={() => {
              const initial = page * 15;
              const end = (page + 1) * 15;
              const newPage = page + 1;
              onClickHandler(initial, end, newPage);
            }}
          >
            Next
            <MdNavigateNext />
          </button>
        </li>
      </ul>
    </IconContext.Provider>
  );
};

function renderButtons(total, onClickHandler, currentPage) {
  const btnArray = [];
  for (let i = 1; i <= total; i++) {
    const initial = (i - 1) * 15;
    const end = i * 15;
    btnArray.push(
      <li key={i}>
        <button
          className={
            currentPage === i
              ? "pagination__text pagination__text--number pagination__text--number--active"
              : "pagination__text pagination__text--number"
          }
          onClick={() =>
            i === 1 ? onClickHandler(0, 15, i) : onClickHandler(initial, end, i)
          }
          disabled={currentPage === i}
        >
          {i}
        </button>
      </li>
    );
  }
  return btnArray;
}

export default Pagination;
