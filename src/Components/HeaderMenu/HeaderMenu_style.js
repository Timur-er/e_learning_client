import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Menu = styled("div")(({ theme: { breakpoints } }) => ({
  width: "80%",
  height: "100vh",
  position: "absolute",
  top: "-1.2rem",
  left: "-1.3rem",
  background: "#fff",
  zIndex: 10,
  display: "grid",
  placeItems: "center",
  alignItems: "center",
  [breakpoints.only("xs")]: {
    display: "block",
  },
  [breakpoints.up("md")]: {
    display: "none",
  },
}));

export const Link = styled(Typography)(() => ({
  color: "inherit",
  textUnderlineOffset: "3px",
  textDecoration: "underline",
}));
