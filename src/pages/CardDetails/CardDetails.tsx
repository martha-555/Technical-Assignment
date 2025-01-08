/** @format */

import { useQuery } from "react-query";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SearchInput from "../ListOfAllRecipes/SearchInput";
import { fetchCardDetails } from "../../api/fetchCardDetails";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";

const CardDetails = () => {
  const [searchParams] = useSearchParams();
  const idMeal = searchParams.get("id");
  const [mealDetails, setMealDetails] = useState<Record<string, any>>({});
  const [image, setImage] = useState<string>("");
  const { data, isLoading, isError } = useQuery(["details", idMeal], () =>
    fetchCardDetails(idMeal || "")
  );

  useEffect(() => {
    if (data?.meals) {
      const dataMeal = data.meals[0];
      setImage(dataMeal.strMealThumb);

      const notEmptyDetails = Object.entries(dataMeal).reduce(
        (accum, [key, value]) => {
          if (value !== "" && value !== null && key !== "strMealThumb") {
            accum[key] = value;
          }

          return accum;
        },
        {} as Record<string, any>
      );
      setMealDetails(notEmptyDetails);
    }
  }, [data]);

  return (
    <PageWrapper>
      <SearchInput />
      <div className={classes.detailsContainer}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={classes.detailsCard}>
            <img src={image} alt="" />
            {Object.entries(mealDetails).map(([key, value], index) => (
              <div
                key={index}
                className={classes.details}
              >{`${key} : ${value}`}</div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
export default CardDetails;
