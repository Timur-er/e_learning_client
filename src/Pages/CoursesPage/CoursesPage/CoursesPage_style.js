import styled from "@emotion/styled";

export const CardsGrid = styled("div")(({ theme: { breakpoints }}) => ({
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "40px",
  margin: "70px 0 0 0",
  rowGap: "50px",
  [breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [breakpoints.down("lg")]: {
    justifyContent: "space-between",
  },
  [breakpoints.up("lg")]: {
    minWidth: "1000px",
  },
}))

export const CardsGridWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}))

export const SelectsGrid = styled("div")(({ theme: { breakpoints } }) => ({
  display: "flex",
  borderRadius: "5px",
  maxWidth: "530px",
  gap: "20px",
  [breakpoints.up("xs")]: {
    padding: 0,
    marginTop: "1rem",
    flexDirection: "column",
  },
  [breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));