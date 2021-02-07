import React, { useCallback, useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { itemCategoryStyles } from "./itemCategoryStyles.jss";
import Button from "@material-ui/core/Button";
import { rootContext } from "../../../../context/rootContext";
import ItemBadge from "./ItemBadge/ItemBadge";
import { alertTypes } from "../../../../lib/constants";

const useStyles = makeStyles(itemCategoryStyles);

const ItemCategory = ({
  itemNumber,
  itemCategory,
  itemText,
  itemName,
  itemId,
  itemBadge,
}) => {
  const getRootContext = useContext(rootContext);
  const { paper, typographyBody2, caption, typographyH6, added } = useStyles();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddItem = () => {
    const item = {
      id: itemId,
      name: itemName,
    };
    const addedItems = [...getRootContext.basketItems, item];
    getRootContext.setBasketItems(addedItems);
    localStorage.setItem("basketItems", JSON.stringify(addedItems));
    setIsAdded(true);

    getRootContext.setPopupData({
      type: alertTypes.SUCCESS,
      isOpen: true,
      message: `Item: "${item.name}" has been added.`,
    });
  };

  const handleSavedBasketItems = useCallback(() => {
    const savedBasketItems = JSON.parse(localStorage.getItem("basketItems"));
    if (savedBasketItems) {
      const isAdded =
        savedBasketItems.filter((item) => item.id === itemId).length > 0;
      setIsAdded(isAdded);
    }
  }, [itemId]);

  const handleRemoveItemFromBasket = useCallback(() => {
    const isInBasket =
      getRootContext.basketItems.filter((item) => {
        return item.id === itemId;
      }).length > 0;
    if (!isInBasket) {
      setIsAdded(false);
    }
  }, [getRootContext.basketItems, itemId]);

  useEffect(() => {
    handleSavedBasketItems();
  }, [handleSavedBasketItems]);

  useEffect(() => {
    handleRemoveItemFromBasket();
  }, [handleRemoveItemFromBasket, getRootContext.basketItems]);

  return (
    <Paper className={[paper, isAdded && added].join(" ")}>
      <Typography
        className={typographyH6}
        variant="h6"
        component="h2"
        align="center"
      >
        {itemName} #{itemNumber}
      </Typography>
      <Typography
        variant="caption"
        align="center"
        gutterBottom
        className={caption}
      >
        {itemCategory}
      </Typography>
      <Typography variant="body2" gutterBottom className={typographyBody2}>
        {itemText}
      </Typography>

      <Button disabled={isAdded} onClick={handleAddItem} variant="contained">
        Add
      </Button>
      <ItemBadge itemBadge={itemBadge} />
    </Paper>
  );
};

export default ItemCategory;
