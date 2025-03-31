/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounceSearch } from "../../hooks/useDebounceSearch";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  background: "#d7ccc8",
  border: "1px solid #efebe9",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    "&::placeholder": {
      color: "#a1887f",
      fontStyle: "italic",
      opacity: 1,
    },
  },
}));

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const debounce = useDebounceSearch(inputValue);
  const navigate = useNavigate();
  const queryParam = searchParams.get("query");

  useEffect(() => {
    if (debounce) {
      params.set("query", debounce);
      setSearchParams(params);
    }
  }, [debounce]);

  useEffect(() => {
    if (queryParam && (debounce || inputValue)) {
      navigate(`/found?query=${queryParam}`);
    } else {
      setInputValue("");
    }
  }, [queryParam]);

  const handleSearchClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      if (value) {
        params.set("query", value);
        setSearchParams(params);
      }
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setInputValue(value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <Search sx={{ marginLeft: "auto" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={inputValue}
          onInput={onInput}
          onKeyDown={handleSearchClick}
        />
      </Search>
    </>
  );
};
export default SearchInput;
