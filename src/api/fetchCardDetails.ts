/** @format */

export const fetchCardDetails = async (id: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  return data;
};
