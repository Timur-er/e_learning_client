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

export const TopInputsGrid = styled("div")(({ theme: { breakpoints } }) => ({
  display: "flex",
  justifyContent: 'space-between',
  borderRadius: "5px",
  gap: "20px",
  [breakpoints.only('xs')]: {
    flexDirection: "column",
    minWidth: "100%"
  },
  [breakpoints.up("xs")]: {
    padding: 0,
    marginTop: "1rem",
  },
  [breakpoints.up("md")]: {
    flexDirection: "row",
    gap: "1rem",
  },
}));

export const SelectsWrapper = styled("div")(({ theme: { breakpoints } }) => ({
  display: "flex",
  maxWidth: "100%",
  minWidth: "unset",
  gap: "20px",
  [breakpoints.only('xs')]: {
    minWidth: "100%",
  },
  [breakpoints.up("xs")]: {

  },
  [breakpoints.up("md")]: {
  },
}));