import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { components } from "react-select";
import { optionStyles } from "./option.jss";

const useStyles = makeStyles(optionStyles);

const Option = ({ value: { name, parent }, isInput, ...rest }) => {
  const { divider } = useStyles();

  return (
    isInput && (
      <components.Option {...rest}>
        <p>
          {name}
          <span className={divider}>{parent.join(" -> ")}</span>
        </p>
      </components.Option>
    )
  );
};

export default Option;
