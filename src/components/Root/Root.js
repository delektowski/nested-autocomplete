import React, { useState, useEffect, useCallback } from "react";
import SingleSelect from "./SingleSelect/SingleSelect";
import DisplayCategory from "./DisplayCategory/DisplayCategory";
import DisplayBadges from "./DisplayBadges/DisplayBadges";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import {
  dataJSON,
  getObjectById,
  removeNullAndUndefined,
} from "../../lib/utils";
import { makeStyles } from "@material-ui/core/styles";
import { rootStyles } from "./rootStyles.jss";
import Basket from "./Basket/Basket";
import { rootContext } from "../../context/rootContext";
import PopupInfo from "./PopupInfo/PopupInfo";
import JsonEditor from "./JsonEditor/JsonEditor";
import RefreshButton from "./RefreshButton/RefreshButton";

const useStyles = makeStyles(rootStyles);

const Root = () => {
  const {
    containerSearchBarOnly,
    containerSearchBarAndCategories,
  } = useStyles();

  const [selectedCategory, setSelectedCategory] = useState({});
  const [isNewValueSelected, setIsNewValueSelected] = useState(true);
  const [isBreadcrumbSelected, setIsBreadcrumbSelected] = useState(false);
  const [categoriesStructure, setCategoriesStructure] = useState([]);
  const [options, setOptions] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [collectedChildren, setCollectedChildren] = useState();
  const [popupData, setPopupData] = useState({
    type: "",
    isOpen: false,
    message: "",
  });
  const [JSONdata, setJSONdata] = useState(dataJSON);

  const isCategorySelected =
    selectedCategory && Object.keys(selectedCategory).length > 0;

  const getCategoriesStructureIds = useCallback(
    (parentId, ids = []) => {
      const obj = getObjectById(options, parentId);

      ids = [...ids, parentId];
      if (obj && obj.parentId) {
        return getCategoriesStructureIds(obj.parentId, ids);
      }
      return ids;
    },
    [options]
  );

  const mergeCategoriesNamesAndIds = (categoriesNames, ids) => {
    if (Array.isArray(categoriesNames)) {
      const reverseIdsOrder = [...ids].reverse();
      return categoriesNames.map((item, index) => {
        return { id: reverseIdsOrder[index], name: item };
      });
    } else if (categoriesNames) {
      return { id: ids, name: categoriesNames };
    }
  };

  const handleSetCategoriesStructure = useCallback(() => {
    if (
      selectedCategory &&
      selectedCategory.value &&
      selectedCategory.value.parentId
    ) {
      const categoriesNames = removeNullAndUndefined(
        selectedCategory.value.parent.flat()
      );
      const selectedCategoryParentId = selectedCategory.value.parentId;

      const categoriesNamesAndIds = mergeCategoriesNamesAndIds(
        categoriesNames,
        getCategoriesStructureIds(selectedCategoryParentId)
      );
      setCategoriesStructure(categoriesNamesAndIds);
    } else if (
      selectedCategory &&
      selectedCategory.id &&
      selectedCategory.parentId
    ) {
      const categoryName = selectedCategory.name;
      const categoriesNames = [
        ...removeNullAndUndefined(selectedCategory.parent.flat()),
        categoryName,
      ];

      const selectedCategoryParentId = selectedCategory.parentId;

      const categoriesNamesAndIds = mergeCategoriesNamesAndIds(
        categoriesNames,
        getCategoriesStructureIds(selectedCategoryParentId)
      );
      setCategoriesStructure(categoriesNamesAndIds);
    } else if (selectedCategory && selectedCategory.value) {
      const categoriesNames = selectedCategory.value.name;
      const selectedCategoryId = selectedCategory.value.id;
      const categoriesNamesAndIds = mergeCategoriesNamesAndIds(
        categoriesNames,
        getCategoriesStructureIds(selectedCategoryId)
      );
      setCategoriesStructure([categoriesNamesAndIds]);
    } else if (selectedCategory && selectedCategory.name) {
      const categoriesNames = selectedCategory.name;
      const selectedCategoryId = selectedCategory.id;
      const categoriesNamesAndIds = mergeCategoriesNamesAndIds(
        categoriesNames,
        getCategoriesStructureIds(selectedCategoryId)
      );
      setCategoriesStructure([categoriesNamesAndIds]);
    }
  }, [selectedCategory, getCategoriesStructureIds]);

  useEffect(() => {
    handleSetCategoriesStructure();
  }, [
    selectedCategory,
    getCategoriesStructureIds,
    handleSetCategoriesStructure,
  ]);

  useEffect(() => {
    const savedBasketItems = JSON.parse(localStorage.getItem("basketItems"));
    if (savedBasketItems) {
      setBasketItems(savedBasketItems);
    }
  }, []);

  return (
    <section
      className={
        isCategorySelected
          ? containerSearchBarAndCategories
          : containerSearchBarOnly
      }
    >
      <rootContext.Provider
        value={{
          setBasketItems,
          basketItems,
          setPopupData,
          JSONdata,
          setJSONdata,
        }}
      >
        <PopupInfo setPopupData={setPopupData} popupData={popupData} />
        <Basket isCategorySelected={isCategorySelected} />
        {isCategorySelected && (
          <RefreshButton
            setSelectedCategory={setSelectedCategory}
            setOptions={setOptions}
          />
        )}
        <SingleSelect
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          options={options}
          setOptions={setOptions}
          setIsNewValueSelected={setIsNewValueSelected}
          isCategorySelected={isCategorySelected}
        />

        {isCategorySelected && (
          <>
            <BreadCrumbs
              categoriesStructure={categoriesStructure}
              setSelectedCategory={setSelectedCategory}
              options={options}
              setIsBreadcrumbSelected={setIsBreadcrumbSelected}
            />
            <DisplayBadges
              options={options}
              setSelectedCategory={setSelectedCategory}
              collectedChildren={collectedChildren}
              isNewValueSelected={isNewValueSelected}
              setIsNewValueSelected={setIsNewValueSelected}
              setIsBreadcrumbSelected={setIsBreadcrumbSelected}
              isBreadcrumbSelected={isBreadcrumbSelected}
            />

            <DisplayCategory
              selectedCategory={selectedCategory}
              setCollectedChildren={setCollectedChildren}
            />
          </>
        )}

        {!isCategorySelected && <JsonEditor setOptions={setOptions} />}
      </rootContext.Provider>
    </section>
  );
};

export default Root;
