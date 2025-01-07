/** @format */

import { filteredResponseData } from "../features/filteredResponseData";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export const fetchAllRecipes = async () => {
  const response = await Promise.all(
    alphabet.map((item) =>
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`)
    )
  ).then(async (res) => {
    const allData = await Promise.all(res.map(filteredResponseData));
    return allData.flat();
  });
  return response;
};
