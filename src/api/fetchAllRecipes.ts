/** @format */

import { filteredResponseData } from "./filteredResponseData";

export const fetchAllRecipes = async (alphabet: string[]) => {
  return await Promise.all(
    alphabet.map((item) =>
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`)
    )
  )
    .then(async (res) => {
      //   setIsLoading(false);
      const allData = await Promise.all(res.map(filteredResponseData));
      return allData;
      //   setList(allData.flat());
      // const uniqueElements = allData.flat().filter((data, index, array) => {
      //   return array.findIndex((i) => i.idMeal == data.idMeal) == index;
      // });
    })
    .catch((error) => console.log(error));
};
