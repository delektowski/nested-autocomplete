export const customSelectStyles = {
  option: (provided) => {
    return {
      ...provided,
      padding: 0,
      paddingLeft: ".5rem",
    };
  },
  groupHeading: (provided) => {
    return {
      ...provided,
      display: "none",
    };
  },
  group: (provided) => {
    return {
      ...provided,
      padding: "0",
    };
  },
  multiValueLabel: (provided) => {
    return {
      ...provided,
      background: "green",
      padding: 0,
      margin: 0,
    };
  },
};
