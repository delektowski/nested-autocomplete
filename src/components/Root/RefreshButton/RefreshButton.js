import React, { useContext } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { refreshButtonStyles } from "./RefreshButtonStyles.jss";
import { rootContext } from "../../../context/rootContext";
import { dataJSON, setObjectToOptionsFormat } from "../../../lib/utils";

const useStyles = makeStyles(refreshButtonStyles);

const RefreshButton = ({ setSelectedCategory, setOptions }) => {
  const getRootContext = useContext(rootContext);
  const { container } = useStyles();

  const handleRefresh = () => {
    getRootContext.setJSONdata(dataJSON);
    setOptions(setObjectToOptionsFormat(dataJSON));
    setSelectedCategory({});
  };

  return (
    <div className={container}>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
      >
        <Typography variant="button">Restart</Typography>
      </Button>
    </div>
  );
};

export default RefreshButton;
