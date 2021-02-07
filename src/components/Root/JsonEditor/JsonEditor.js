import React, { useState, useEffect, useContext } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { JsonEditorStyles } from "./JsonEditorStyles.jss";
import { dataJSON, IsJSON, setObjectToOptionsFormat } from "../../../lib/utils";
import { rootContext } from "../../../context/rootContext";
import { alertTypes, messages } from "../../../lib/constants";

const AccordionSummary = withStyles({
  content: {
    flexGrow: 0,
  },
})(MuiAccordionSummary);

const useStyles = makeStyles(JsonEditorStyles);

const JsonEditor = ({ setOptions }) => {
  const getRootContext = useContext(rootContext);
  const { container, textArea, accordion, buttonDefault } = useStyles();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const jsonPrettify = (json) => {
    return JSON.stringify(json, undefined, 4);
  };

  const handleTextAreaChange = (e) => {
    const value = e.target.value;
    setTextAreaValue(value);
  };

  const handleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleSaveEditedJSON = () => {
    if (IsJSON(textAreaValue)) {
      const toJSON = JSON.parse(textAreaValue);
      getRootContext.setJSONdata(toJSON);
      getRootContext.setPopupData({
        type: alertTypes.SUCCESS,
        isOpen: true,
        message: messages.JSON_CHANGED,
      });

      setOptions(setObjectToOptionsFormat(toJSON));
      handleExpand();
    } else {
      getRootContext.setPopupData({
        type: alertTypes.ERROR,
        isOpen: true,
        message: messages.JSON_NOT_VALID,
      });
    }
  };

  const handleSetDefaultJSON = () => {
    getRootContext.setJSONdata(dataJSON);
    getRootContext.setPopupData({
      type: alertTypes.SUCCESS,
      isOpen: true,
      message: messages.JSON_DEFAULT,
    });

    setOptions(setObjectToOptionsFormat(dataJSON));
    setTextAreaValue(jsonPrettify(dataJSON));
  };

  useEffect(() => {
    setTextAreaValue(jsonPrettify(getRootContext.JSONdata));
  }, [getRootContext.JSONdata]);



  return (
    <div className={container}>
      <Accordion className={accordion} expanded={isExpanded}>
        <AccordionSummary
          onClick={handleExpand}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography align="center">Edit JSON</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <textarea
            className={textArea}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            rows={25}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            className={buttonDefault}
            onClick={handleSetDefaultJSON}
          >
            Default
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={handleExpand}
          >
            Cancel
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={handleSaveEditedJSON}
          >
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default JsonEditor;
