import React, { useState, useEffect, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import { setObjectToOptionsFormat } from "../../../lib/utils";
import { customSelectStyles } from "./customSelectStyles";
import { singleSelectStyles } from "./singleSelect.jss";
import Option from "./Option/Option";
import GroupHeading from "./GroupHeading/GroupHeading";
import { rootContext } from "../../../context/rootContext";

const useStyles = makeStyles(singleSelectStyles);

const SingleSelect = ({
  setSelectedCategory,
  options,
  setOptions,
  setIsNewValueSelected,
  isCategorySelected,
  selectedCategory,
}) => {
  const getRootContext = useContext(rootContext);
  const {
    containerSearchBarOnly,
    containerSearchBarAndCategories,
    titleSearchBarOnly,
    titleSearchBarAndCategories,
    selectSearchBarAndCategoriesContainer,
    selectSearchBarOnlyContainer,
    titleContainer,
    select,
  } = useStyles();
  const selectInputRef = useRef();

  const [selectedValue, setSelectedValue] = useState("");
  const [isInput, setIsInput] = useState(false);

  const handleSelectedValue = (value) => {
    setSelectedValue(value);
    setIsNewValueSelected(true);
  };
  const handleClearInput = () => {
    selectInputRef.current.select.clearValue();
  };

  const handleInputChange = (isInput) => {
    setIsInput(isInput);
  };

  const CustomOption = (props) => {
    return <Option {...props} isInput={isInput} />;
  };

  useEffect(() => {
    if (selectedValue) {
      setSelectedCategory(selectedValue);
    }
  }, [selectedValue, setSelectedCategory]);
  useEffect(() => {
    setOptions(setObjectToOptionsFormat(getRootContext.JSONdata));
  }, [getRootContext.JSONdata, setOptions]);

  useEffect(() => {
    const isSelectedCategory =
      selectedCategory && Object.keys(selectedCategory).length === 0;
    if (isSelectedCategory) {
      selectInputRef.current.select.clearValue();
    }
  }, [selectedCategory]);

  return (
    <>
      <section
        className={
          isCategorySelected
            ? containerSearchBarAndCategories
            : containerSearchBarOnly
        }
      >
        <div className={titleContainer}>
          <h1
            className={
              isCategorySelected
                ? titleSearchBarAndCategories
                : titleSearchBarOnly
            }
          >
            Nested Autocomplete
          </h1>
        </div>

        <div
          className={
            isCategorySelected
              ? selectSearchBarOnlyContainer
              : selectSearchBarAndCategoriesContainer
          }
        >
          <Select
            className={select}
            ref={selectInputRef}
            options={options}
            components={{
              Option: CustomOption,
              GroupHeading,
            }}
            styles={customSelectStyles}
            onChange={handleSelectedValue}
            onFocus={handleClearInput}
            onInputChange={handleInputChange}
          />
        </div>
      </section>
    </>
  );
};

export default SingleSelect;
