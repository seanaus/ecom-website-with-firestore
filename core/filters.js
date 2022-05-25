"use strict";
const firebase = require("../db");
const firestore = firebase.firestore();
const { loadConfig } = require("../core/config");
const Filters = require("../models/Filters");
const FilterItem = require("../models/FilterItem");

let filters = new Filters();
let level = 0;

const IsArray = (aryCheck) => {
  return aryCheck && Array.isArray(aryCheck) && aryCheck.length > 0;
};

const loadFilters = async () => {
  try {

    filters = new Filters();

    const data = await firestore.collection("components");
    const docs = await data.get();
    if (docs.empty) {
      console.log("ERROR: No filter data found");
    } else {
      docs.forEach((doc) => {
        if (doc.id === "filters") {
          doc.data().items.forEach((item) => {
            const node = new FilterItem(
              item.id,
              item.level,
              item.name,
              item.parentId
            );
            filters.add(node);
          });
        }
      });
      filters.items.forEach((node) => {
        node.children = parseTree(node.id);
      });
      return filters;
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
const getChildren = (id) => {
  const children = filters.items
    .filter((check) => check.parentId == id)
    .map((child) => {
      return child.id;
    });
  if (IsArray(children)) {
    return children;
  } else {
    return [];
  }
};
const parseTree = (id) => {
	let children = [];
  let cache = [];
  cache.push(id);
  while (cache.length > 0) {
    cache = parseBranch(cache);
    children = children.concat(cache);
  }
  return children
}
const parseBranch = (check) => {
  let pass = [];
  check.forEach((id) => {
    pass = pass.concat(getChildren(id));
  });
	return pass;
}
module.exports = {
  loadFilters,
};
