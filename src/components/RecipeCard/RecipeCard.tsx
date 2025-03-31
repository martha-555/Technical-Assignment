/** @format */

import { useContext, useEffect, useState } from "react";
import { RecipeCardType } from "../../types/types";
import { CardContext } from "../../context/CardProvider";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  recipe: RecipeCardType;
};

const RecipeCard = ({ recipe }: Props) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const contextData = useContext(CardContext);
  const savedRecipes = contextData.savedRecipes;
  const navigate = useNavigate();

  const handleClick = () => {
    isFound ? contextData.deleteRecipe(recipe) : contextData.addRecipe(recipe);
  };

  useEffect(() => {
    const isFoundRecipe = savedRecipes.find(
      (item) => item.idMeal === recipe.idMeal
    );

    isFoundRecipe ? setIsFound(true) : setIsFound(false);
  }, [savedRecipes, isFound, recipe]);

  const handleViewDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLDivElement).id;
    if (id) navigate(`/details?id=${id}`);
  };

  return (
    <Card
      onClick={handleViewDetails}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexBasis: "calc(25% - 10px)",
        maxWidth: "250px",
        minWidth: "250px",
        flexGrow: 1,
      }}
      id={recipe.idMeal}
    >
      <div id={recipe.idMeal}>
        <CardMedia
          id={recipe.idMeal}
          component="img"
          image={recipe.strMealThumb}
          alt="green iguana"
          sx={{
            marginBottom: "10px",
          }}
        />
        <Typography
          id={recipe.idMeal}
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {recipe.strMeal}
        </Typography>
      </div>

      <div id={recipe.idMeal}>
        <CardActionArea id={recipe.idMeal}>
          <CardContent id={recipe.idMeal}>
            <Typography
              id={recipe.idMeal}
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Category: {recipe.strCategory}
            </Typography>
            <Typography
              id={recipe.idMeal}
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Area: {recipe.strArea}
            </Typography>
            <FavoriteIcon
              color={isFound ? "warning" : "inherit"}
              onClick={handleClick}
              sx={{ margin: "10px" }}
            />
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  );
};

export default RecipeCard;
