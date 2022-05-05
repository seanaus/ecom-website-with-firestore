"use strict";
const firebase = require("../db");
const firestore = firebase.firestore();
const { loadConfig } = require("../core/config");
const FilterItem = require("../models/FilterItem");

let nodes = [];
let levels = [];

const IsArray = (aryCheck) => {
  return aryCheck && Array.isArray(aryCheck) && aryCheck.length > 0;
};
const getChildren = (node) => {
  const children = nodes
    .filter((check) => check.parentId === node.id)
    .map((child) => {
      return child.id;
    });
  if (IsArray(children)) {
    return children;
  } else {
    return [];
  }
};

// const renderItems = (items)=>{
//   if(IsArray(items)) {
//         const element = document.createElement("div");
//         const textnode = document.createTextNode(JSON.stringify(items));
//         element.appendChild(textnode);
//         document.body.appendChild(element);
//         element.innerHTML = JSON.stringify(items)
//   }
// }

const parse = (node) => {
  // let items = [];
  // const children = getChildren(node);
  // if (IsArray(children)) {
  //   children.forEach((child) => {
  //     items.push(child);
  //   });
  // }
  return children;
};
// const editNode = (srcObj, values) => {
//   return Object.assign(srcObj, { children: values });
// };
// const loadFiltersOld = async () => {
//   let nodes = [];
// try {
//   let nodes = [];
//   const filters = await loadConfig("filters");
//   filters.items.forEach((item, idx) => {
//     const node = new FilterItem(
//       item.id,
//       item.level,
//       item.name,
//       item.parentId,
// item.children = parse(item)
// );
//   console.log("NODE");
//   console.log(JSON.stringify(node));
// nodes.push(node);
//   });
//   return nodes
// } catch (error) {
//   console.log(error.message);
//   return []
// }
//   console.log("NODES");
//   console.log(JSON.stringify(nodes));
//   return nodes;
// };

const loadFilters = async () => {
  try {
    nodes = [];
    levels = [];
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
            nodes.push(node);
          });
        }
      });
      nodes.forEach((node) => {
        const children = getChildren(node);
        children.forEach((child) => {
          node.children.push(child);
        });
      });
      // console.log(nodes);
      return nodes;
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
module.exports = {
  loadFilters,
};
