import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { basketStyles } from "./basketStyles.jss";
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Typography from "@material-ui/core/Typography";
import ModalInfo from "./ModalInfo/ModalInfo";
import { rootContext } from "../../../context/rootContext";

const useStyles = makeStyles(basketStyles);

const Basket = ({ isCategorySelected }) => {
  const getRootContext = useContext(rootContext);
  const {
    container,
    basketSearchBarAndCategories,
    basketPositionSearchBarOnly,
  } = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className={[
        container,
        isCategorySelected
          ? basketSearchBarAndCategories
          : basketPositionSearchBarOnly,
      ].join(" ")}
    >
      <ModalInfo isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Button
        size="large"
        variant="contained"
        color="primary"
        startIcon={<ShoppingBasketIcon />}
        onClick={handleOpenModal}
      >
        <Typography variant="button">
          Basket ({getRootContext.basketItems.length})
        </Typography>
      </Button>

    </div>
  );
};

export default Basket;
