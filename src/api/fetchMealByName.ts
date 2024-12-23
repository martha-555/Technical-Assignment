/** @format */

export const fetchMealByName = async (name: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await response.json();
  return data;
};
