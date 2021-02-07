import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { itemBadgeStyles } from "./itemBadgeStyles.jss";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(itemBadgeStyles);

const ItemBadge = ({ itemBadge = null }) => {
  const { container } = useStyles();
  return (
    itemBadge && (
      <div className={container}>
        <Typography variant="overline">{itemBadge}</Typography>
      </div>
    )
  );
};

export default ItemBadge;
