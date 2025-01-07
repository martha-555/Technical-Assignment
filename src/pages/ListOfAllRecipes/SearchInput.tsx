/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";
import { useDebounceSearch } from "../../hooks/useDebounceSearch";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const debounce = useDebounceSearch(inputValue);
  const navigate = useNavigate();
  const queryParam = searchParams.get("query");

  useEffect(() => {
    if (debounce) {
      console.log({ debounce });
      params.set("query", debounce);
      setSearchParams(params);
    }
  }, [debounce]);

  useEffect(() => {
    if (queryParam && (debounce || inputValue)) {
      navigate(`/found?query=${encodeURIComponent(queryParam)}`);
    } else {
      setInputValue("");
    }
  }, [queryParam]);

  const handleSearchClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      if (value) setSearchParams({ p: "1", query: value });
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setInputValue(value);
  };
  return (
    <div>
      <input
        value={inputValue}
        onInput={onInput}
        placeholder="search"
        className={classes.searchInput}
        type="search"
        onKeyDown={handleSearchClick}
      />
      <span>{queryParam}</span>
    </div>
  );
};
export default SearchInput;
