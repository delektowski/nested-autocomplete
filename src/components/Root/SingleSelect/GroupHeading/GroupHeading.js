import React from "react";
import { components } from "react-select";

const GroupHeading = (props) => {
  return (
    <components.GroupHeading {...props}>
      <p>{props.children}</p>
    </components.GroupHeading>
  );
};

export default GroupHeading;
