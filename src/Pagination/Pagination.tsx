/** @format */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";

type Props = {
  numberOfRecipes: number;
  pageSize: number;
};

const Pagination = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("p") || 1;
  const totalPages = Math.ceil(props.numberOfRecipes / props.pageSize);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages - 1; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = (e.target as HTMLButtonElement).innerText;
    setSearchParams({ p: page });
  };

  useEffect(() => {
    setSearchParams({ p: "1" });
  }, []);

  const firstElements = pageNumbers.splice(0, 3);
  const lastElement = pageNumbers.splice(pageNumbers.length - 1, 1);

  return (
    <div className={classes.paginationContainer}>
      {totalPages > 1 &&
        firstElements.map((i, index) => (
          <button
            className={
              currentPage == i.toString() ? classes.activePage : classes.page
            }
            id={i.toString()}
            onClick={handleClick}
            key={index}
          >
            {i}{" "}
          </button>
        ))}

      {+currentPage > 4 && <span>...</span>}

      {pageNumbers
        .slice(
          +currentPage > 6 ? +currentPage - 6 : 0,
          +currentPage > 6 ? +currentPage - 2 : 4
        )
        .map((i, index) => (
          <button
            className={
              currentPage == i.toString() ? classes.activePage : classes.page
            }
            id={i.toString()}
            onClick={handleClick}
            key={index}
          >
            {i}{" "}
          </button>
        ))}

      {+currentPage < lastElement[0] - 1 && <span>...</span>}

      {totalPages > 10 && (
        <button
          className={
            currentPage == lastElement[0] ? classes.activePage : classes.page
          }
          id={lastElement[0].toString()}
          onClick={handleClick}
        >
          {lastElement[0]}{" "}
        </button>
      )}
    </div>
  );
};

export default Pagination;
