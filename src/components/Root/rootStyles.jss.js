export const rootStyles = (theme) => ({
  containerSearchBarOnly: {
    width: "99vw",
    position: "relative",
    marginTop: "12rem",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  containerSearchBarAndCategories: {
    width: "99vw",
    marginTop: "2rem",
    margin: "0",
  },
});
