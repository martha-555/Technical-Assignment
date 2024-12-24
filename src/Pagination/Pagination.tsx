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

  const newParams = new URLSearchParams(searchParams);
  const currentPage = searchParams.get("p") || 1;
  const totalPages = Math.ceil(props.numberOfRecipes / props.pageSize);
  const searchValue = searchParams.get("value");
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = (e.target as HTMLButtonElement).innerText;
    newParams.set("p", page.toString());
    setSearchParams(newParams);
  };
  const firstPage = pageNumbers.splice(0, 3);
  const lastPage = pageNumbers.splice(pageNumbers.length - 1, 1);

  return (
    <div className={classes.paginationContainer}>
      {totalPages > 1 &&
        firstPage.map((i, index) => (
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

      {+currentPage < lastPage[0] - 1 && <span>...</span>}

      {totalPages > 10 && (
        <button
          className={
            currentPage == lastPage[0] ? classes.activePage : classes.page
          }
          id={lastPage[0].toString()}
          onClick={handleClick}
        >
          {lastPage[0]}{" "}
        </button>
      )}
    </div>
  );
};

export default Pagination;
