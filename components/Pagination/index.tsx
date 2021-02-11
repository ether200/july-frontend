import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";

type Props = {
  page: number;
  numberOfBooks: number;
};

const Pagination: React.FC<Props> = ({ page, numberOfBooks }) => {
  const router = useRouter();
  const totalPages = Math.ceil(numberOfBooks / 15);

  const onClickHandler = (toGoPage: number) =>
    router.push(`/books?page=${toGoPage}`);
  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <ul className="pagination">
        <li>
          <button
            className="pagination__text"
            disabled={page <= 1}
            onClick={() => onClickHandler(page - 1)}
          >
            <MdNavigateBefore /> Prev
          </button>
        </li>
        {renderButtons(totalPages, onClickHandler, page)}
        <li>
          <button
            className="pagination__text"
            disabled={page >= totalPages}
            onClick={() => onClickHandler(page + 1)}
          >
            Next
            <MdNavigateNext />
          </button>
        </li>
      </ul>
    </IconContext.Provider>
  );
};

function renderButtons(total, callBack, currentPage) {
  const btnArray = [];
  for (let i = 1; i <= total; i++) {
    btnArray.push(
      <li key={i}>
        <button
          className={
            currentPage === i
              ? "pagination__text pagination__text--number pagination__text--number--active"
              : "pagination__text pagination__text--number"
          }
          onClick={() => callBack(i)}
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
