import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useContext,
} from "react";
import {
  getChildrenRecursively,
  getObjectById,
  itemText,
} from "../../../lib/utils";
import ItemCategory from "./ItemCategory/ItemCategory";
import { makeStyles } from "@material-ui/core/styles";

import { displayCategoryStyles } from "./displayCategoryStyles.jss";
import { rootContext } from "../../../context/rootContext";

const useStyles = makeStyles(displayCategoryStyles);

const DisplayCategory = ({ selectedCategory, setCollectedChildren }) => {
  const getRootContext = useContext(rootContext);
  const { container } = useStyles();
  const [dataCategories, setDataCategories] = useState([]);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  const setCategoryId = (selected) => {
    const categorySelectedByBadge = selected.id;
    const categorySelectedByAutocomplete = selected.value;
    if (categorySelectedByAutocomplete) {
      return categorySelectedByAutocomplete.parentId
        ? categorySelectedByAutocomplete.parentId
        : categorySelectedByAutocomplete.id;
    } else {
      return categorySelectedByBadge;
    }
  };
  const getCategoryItems = useCallback(() => {
    const category = getObjectById(
      dataCategories,
      setCategoryId(selectedCategory)
    );

    const collectedChildren = category.children.reduce((sum, current) => {
      current = getChildrenRecursively(current).flat();
      return [...sum, current].flat();
    }, []);

    setCollectedChildren(collectedChildren);

    return collectedChildren.map((item, index) => {
      const itemNumber = index + 1;
      const { name, id, parent, description, badge } = item;
      return (
        <Fragment key={id}>
          <ItemCategory
            itemNumber={itemNumber}
            itemName={name}
            itemCategory={parent}
            itemText={description || itemText}
            itemId={id}
            itemBadge={badge}
          />
        </Fragment>
      );
    });
  }, [dataCategories, selectedCategory, setCollectedChildren]);

  useEffect(() => {
    setDataCategories(getRootContext.JSONdata);
  }, [getRootContext.JSONdata]);
  useEffect(() => {
    if (dataCategories.length > 0) {
      setItemsToDisplay(getCategoryItems());
    }
  }, [dataCategories, getCategoryItems]);

  return <section className={container}>{itemsToDisplay}</section>;
};

export default DisplayCategory;
