import React, { useContext, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { rootContext } from "../../../../context/rootContext";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import { modalInfoStyles } from "./modalInfoStyles.jss";
import { deepCopyObj, getObjectById } from "../../../../lib/utils";
import { alertTypes, messages } from "../../../../lib/constants";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(modalInfoStyles);

const ModalInfo = ({ isModalOpen = false, setIsModalOpen }) => {
  const getRootContext = useContext(rootContext);
  const {
    paper,
    buttonCheckout,
    buttonClear,
    span,
    li,
    ol,
    deleteIcon,
  } = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const isButtonDisabled = getRootContext.basketItems.length === 0;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClearBasket = () => {
    getRootContext.setBasketItems([]);
    localStorage.removeItem("basketItems");
    setIsModalOpen(false);
    getRootContext.setPopupData({
      type: alertTypes.SUCCESS,
      isOpen: true,
      message: messages.ALL_ITEMS_REMOVED,
    });
  };

  const handleDeleteItem = (itemId) => {
    const basketItems = deepCopyObj(getRootContext.basketItems);
    const getItemName = getObjectById(basketItems, itemId).name;

    const basketItemsAfterRemove = basketItems.filter((item) => {
      return item.id !== itemId;
    });
    localStorage.setItem("basketItems", JSON.stringify(basketItemsAfterRemove));
    getRootContext.setBasketItems(basketItemsAfterRemove);
    getRootContext.setPopupData({
      type: alertTypes.SUCCESS,
      isOpen: true,
      message: `Item: "${getItemName}" has been removed.`,
    });
  };

  const body = (
    <div style={modalStyle} className={paper}>
      <Typography>Added items: </Typography>
      <ol className={ol}>
        {getRootContext.basketItems.map((item) => {
          return (
            <Fragment key={item.id}>
              <Typography variant="overline">
                <li className={li}>
                  {item.name} (id:{item.id}){" "}
                  <span className={span}>
                    <DeleteIcon
                      fontSize="small"
                      className={deleteIcon}
                      onClick={() => handleDeleteItem(item.id)}
                    />
                  </span>
                </li>
              </Typography>
            </Fragment>
          );
        })}
      </ol>
      <div>
        <Button
          disabled={isButtonDisabled}
          size="small"
          className={buttonCheckout}
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
        >
          Checkout
        </Button>
        <Button
          disabled={isButtonDisabled}
          size="small"
          className={buttonClear}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleClearBasket}
        >
          Clear basket
        </Button>
      </div>

      <ModalInfo />
    </div>
  );

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default ModalInfo;
