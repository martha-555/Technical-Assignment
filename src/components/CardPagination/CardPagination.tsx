/** @format */
import { usePagination } from "../../hooks/usePagination";
import { Route, Routes, useLocation } from "react-router";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";

type Props = {
  recipeCount: number;
};

const CardPagination = ({ recipeCount }: Props) => {
  const { totalPages, changeCurrentPage } = usePagination(recipeCount);

  function Content() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1", 10);

    return (
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        page={page}
        count={totalPages}
        renderItem={(item) => {
          return (
            <PaginationItem
              sx={{
                fontSize: "15px",
              }}
              component={Link}
              to={`${location.pathname}${
                item.page === 1 ? "" : `?page=${item.page}`
              }`}
              {...item}
              onClick={() =>
                item.page && changeCurrentPage(item.page.toString())
              }
            />
          );
        }}
      />
    );
  }

  return (
    <Routes>
      <Route path="*" element={<Content />} />
    </Routes>
  );
};

export default CardPagination;
