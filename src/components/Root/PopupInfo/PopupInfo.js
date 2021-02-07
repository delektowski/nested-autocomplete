import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PopupInfo = ({ setPopupData, popupData: { type, isOpen, message } }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPopupData((prev) => {
      return { type: prev.type, isOpen: false, message: prev.message };
    });
  };

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PopupInfo;
