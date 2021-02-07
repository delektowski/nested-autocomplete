import React, { useEffect, useState } from "react";
import { getObjectById } from "../../../lib/utils";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { displayBadgesStyles } from "./DisplayBadges.jss";
import SliderParent from "../Slider/Slider";

const useStyles = makeStyles(displayBadgesStyles);

const DisplayBadges = ({
  setSelectedCategory,
  options,
  collectedChildren,
  isNewValueSelected,
  setIsNewValueSelected,
  setIsBreadcrumbSelected,
  isBreadcrumbSelected,
}) => {
  const { container, chip } = useStyles();
  const [badges, setBadges] = useState([]);
  const [shouldBadgeChange, setShouldBadgeChange] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const isBadgeToChange = (parentId) => {
    const filteredBadgesHasChildren = badges.filter((item) => {
      return isChildren(item);
    });
    return (
      filteredBadgesHasChildren.filter((item) => item.id === parentId).length >
      0
    );
  };

  const handleClick = (id) => {
    const selectedCategoryParentId = getObjectById(options, id);
    const parentId = selectedCategoryParentId.parentId;

    if (isBadgeToChange(parentId)) {
      setShouldBadgeChange(true);
    } else {
      setShouldBadgeChange(false);
    }
    setSelectedCategory(selectedCategoryParentId);
    setSelectedBadge(id);
  };

  const isChildren = (item) => {
    return item.children.length > 0;
  };

  const isBadgeSelected = (id) => {
    return selectedBadge === id;
  };

  useEffect(() => {
    if (shouldBadgeChange) {
      setBadges(collectedChildren);
    }
  }, [collectedChildren, setBadges, shouldBadgeChange]);
  useEffect(() => {
    if (isNewValueSelected) {
      setShouldBadgeChange(true);
    }

    setIsNewValueSelected(false);
  }, [isNewValueSelected, setShouldBadgeChange, setIsNewValueSelected]);
  useEffect(() => {
    if (isBreadcrumbSelected) {
      setShouldBadgeChange(true);
    }

    setIsBreadcrumbSelected(false);
  }, [isBreadcrumbSelected, setShouldBadgeChange, setIsBreadcrumbSelected]);

  useEffect(() => {
    setSelectedBadge(null);
  }, [isBreadcrumbSelected, isNewValueSelected]);

  const handleDisplayBadges = () => {
    return (
      badges &&
      badges
        .filter((item) => {
          return isChildren(item);
        })
        .map((item) => {
          return (
            <Chip
              key={item.id}
              className={chip}
              clickable
              label={item.name}
              color={isBadgeSelected(item.id) ? "primary" : "default"}
              onClick={() => handleClick(item.id)}
            />
          );
        })
    );
  };

  return (
    <nav className={container}>
      <SliderParent
        itemsNumber={handleDisplayBadges() ? handleDisplayBadges().length : 0}
      >
        {handleDisplayBadges()}
      </SliderParent>
    </nav>
  );
};

export default DisplayBadges;
