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
import CardActions from "@mui/material/CardActions";
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
        flexBasis: "calc(21% - 5px)",
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#efebe9",
      }}
      id={recipe.idMeal}
    >
      <CardActionArea id={recipe.idMeal}>
        <CardMedia
          id={recipe.idMeal}
          component="img"
          height="140"
          image={recipe.strMealThumb}
          alt="green iguana"
        />
        <CardContent id={recipe.idMeal}>
          <Typography
            id={recipe.idMeal}
            gutterBottom
            variant="h5"
            component="div"
          >
            {recipe.strMeal}
          </Typography>
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
        </CardContent>
      </CardActionArea>
      <CardActions id={recipe.idMeal}></CardActions>
      <FavoriteIcon
        color={isFound ? "warning" : "inherit"}
        onClick={handleClick}
        sx={{ margin: "10px" }}
      />
    </Card>
  );
};

export default RecipeCard;
