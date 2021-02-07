export const singleSelectStyles = (theme) => ({
  containerSearchBarOnly: {
    width: "60vw",
    marginTop: "2rem",
    margin: "0 auto",

    [theme.breakpoints.down("sm")]: {
      marginTop: "3rem",
      width: "90vw",
    },
  },
  containerSearchBarAndCategories: {
    width: "100vw",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleSearchBarOnly: {
    fontWeight: "100",
    textAlign: "center",
    paddingBottom: "2rem",
    color: "grey",
    fontSize: "1.5rem",
  },
  titleSearchBarAndCategories: {
    fontWeight: "100",
    fontSize: "1rem",
    color: "grey",
  },
  select: {
    width: "35vw",
    margin: "0 auto",
  },

  titleContainer: {
    padding: "0 2.5rem",
  },
  selectSearchBarAndCategoriesContainer: {
    margin: "0 auto",
  },
  selectSearchBarOnlyContainer: {
    margin: "0",
  },
});
