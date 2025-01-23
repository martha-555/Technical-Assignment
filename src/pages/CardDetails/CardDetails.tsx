/** @format */

import { useQuery } from "react-query";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { fetchCardDetails } from "../../api/fetchCardDetails";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const CardDetails = () => {
  const [searchParams] = useSearchParams();
  const idMeal = searchParams.get("id");
  const [mealDetails, setMealDetails] = useState<Record<string, any>>({});
  const [image, setImage] = useState<string>("");
  const [strMeal, setStrMeal] = useState<string>("");
  const { data, isLoading, isError } = useQuery(["details", idMeal], () =>
    fetchCardDetails(idMeal || "")
  );

  useEffect(() => {
    if (data?.meals) {
      const dataMeal = data.meals[0];
      setImage(dataMeal.strMealThumb);
      setStrMeal(dataMeal.strMeal);
      const notEmptyDetails = Object.entries(dataMeal).reduce(
        (accum, [key, value]) => {
          if (
            value !== null &&
            (value as string).trim() !== "" &&
            key !== "strMealThumb" &&
            key !== "strMeal"
          ) {
            accum[key] = value;
          }
          return accum;
        },
        {} as Record<string, any>
      );
      setMealDetails(notEmptyDetails);
    }
  }, [data]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <PageWrapper>
      {isLoading ? (
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </Stack>
      ) : (
        <Card sx={{ maxWidth: 345, margin: "0 auto", background: "#efebe9" }}>
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title={strMeal}
          />
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Show more...
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {Object.entries(mealDetails).map(([key, value], index) => (
                <div key={index}>
                  <Typography key={index} sx={{ marginBottom: 2 }}>
                    {`${key} : ${value}`}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </PageWrapper>
  );
};
export default CardDetails;
