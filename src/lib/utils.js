export const dataJSON = require("./test.json");

export const removeNullAndUndefined = (arr) => {
  return arr.filter((i) => i !== undefined && i !== null);
};

export const setObjectToOptionsFormat = (json) => {
  return setFlattenJSON(json);
};

export const getObjectById = (theObject, parentId) => {
  let result = null;
  if (theObject instanceof Array) {
    let i;
    for (i = 0; i < theObject.length; i++) {
      result = getObjectById(theObject[i], parentId);
      if (result) {
        break;
      }
    }
  } else {
    let prop;
    for (prop in theObject) {
      if (theObject.hasOwnProperty(prop)) {
        if (prop === "id") {
          if (theObject[prop] === parentId) {
            return theObject;
          }
        }
        if (
          theObject[prop] instanceof Object ||
          theObject[prop] instanceof Array
        ) {
          result = getObjectById(theObject[prop], parentId);
          if (result) {
            break;
          }
        }
      }
    }
  }
  return result;
};

export const itemText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const setFlattenJSON = (JSON, grandparent, parentId) => {
  let flattenJSON = [];
  JSON.forEach((item) => {
    const isGrandparentArray = Array.isArray(grandparent);

    const getParentValue = () => {
      function setParentValue() {
        if (item.parent !== null && grandparent !== null) {
          return isGrandparentArray
            ? [...grandparent, item.parent].flat()
            : [grandparent, item.parent].flat();
        } else if (item.parent === null && grandparent !== null) {
          return [grandparent].flat();
        } else {
          return [item.parent].flat();
        }
      }

      return removeNullAndUndefined(setParentValue());
    };

    const optionValue = {
      value: {
        id: item.id,
        name: item.name,
        parent: removeNullAndUndefined(getParentValue().flat()),
        parentId,
      },
      label: item.keywords,
    };

    if (item.children.length > 0) {
      const recursion = item.parent
        ? [
            ...setFlattenJSON(
              item.children,
              [grandparent, item.parent],
              item.id
            ),
          ]
        : grandparent
        ? [...setFlattenJSON(item.children, [grandparent], item.id)]
        : [...setFlattenJSON(item.children, null, item.id)];

      flattenJSON = [...flattenJSON, ...recursion.flat()];
    }

    flattenJSON = [...flattenJSON, { ...optionValue }];
  });
  return flattenJSON;
};

export const getChildrenRecursively = (item) => {
  let itemNested;

  function extractItemFromArray() {
    item = item[0];
  }

  function isChildren(item) {
    return item.children && item.children.length > 0;
  }

  if (Array.isArray(item)) {
    const getItemCopy = deepCopyObj(item);
    extractItemFromArray();

    itemNested = [
      getItemCopy.map((i) => {
        if (isChildren(i)) {
          i = [i, ...getChildrenRecursively(i.children)];
        }
        return i;
      }),
    ].flat();
  }
  if (isChildren(item)) {
    const itemChildren = [item.children].flat();

    return [
      item,
      ...itemChildren.map((i) => {
        if (isChildren(i)) {
          i = [i, ...getChildrenRecursively(i.children)];
        }
        return i;
      }),
    ].flat();
  } else {
    return itemNested
      ? removeDuplicatesObjIdFromArray([item, ...itemNested])
      : [item];
  }
};

export const removeDuplicatesObjIdFromArray = (arr) => {
  return arr.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
};

export const deepCopyObj = (obj) => {
  const setItemCopy = JSON.stringify(obj);
  return JSON.parse(setItemCopy);
};

export const IsJSON = (item) => {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  return typeof item === "object" && item !== null;
};
