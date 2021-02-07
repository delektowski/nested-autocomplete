import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { breadCrumbsStyles } from "./BreadCrumbs.jss";
import { getObjectById } from "../../../lib/utils";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(breadCrumbsStyles);

const BreadCrumbs = ({
  categoriesStructure,
  setSelectedCategory,
  options,
  setIsBreadcrumbSelected,
}) => {
  const { container } = useStyles();

  function handleClick(event, id) {
    event.preventDefault();
    const selectedCategory = getObjectById(options, id);
    setIsBreadcrumbSelected(true);
    setSelectedCategory(selectedCategory);
  }
  return (
    <div className={container}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {categoriesStructure.map(({ name, id }, index) => {
          const num = index;
          const isRootCategory = Array.isArray(id);
          const length = categoriesStructure.length - 1;
          return num !== length ? (
            <Link
              key={name}
              color="inherit"
              href="/"
              onClick={(e) => handleClick(e, id)}
            >
              {name}
            </Link>
          ) : isRootCategory ? (
            <Typography key={name} color="textPrimary">
              {name}
            </Typography>
          ) : (
            <Link
              key={name}
              color="inherit"
              href="/"
              onClick={(e) => handleClick(e, id)}
            >
              <Typography key={name} color="textPrimary">
                {name}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
