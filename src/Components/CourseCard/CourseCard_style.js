import styled from "@emotion/styled";
import { CardMedia } from "@mui/material";

export const CourseCard = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: "#fff",
  width: "100%",
  maxWidth: 600,

  [theme.breakpoints.only("xs")]: {
    flexDirection: "column",
    alignContent: "space-between",
    minWidth: "100%",
  },
}));

export const Media = styled(CardMedia)(({ theme }) => ({
  minWidth: "25%",
  maxWidth: "30%",
  [theme.breakpoints.only("xs")]: {
    minWidth: "100%",
    minHeight: "250px", 
    objectFit: "contain",
  },
}));
