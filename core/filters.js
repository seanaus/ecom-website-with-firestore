"use strict";
const firebase = require("../db");
const firestore = firebase.firestore();
const { loadConfig } = require("../core/config");
const Filters = require("../models/Filters");
const FilterItem = require("../models/FilterItem");

let filters = new Filters();
// let nodes = [];
let level = 0;

const IsArray = (aryCheck) => {
  return aryCheck && Array.isArray(aryCheck) && aryCheck.length > 0;
};
const getChildren = (node) => {
  const children = filters.items
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
  let items = [];
  const children = getChildren(node);
  if (IsArray(children)) {
    saveChildren(children,items)
  } else {
    return items;
  }
};
const saveChildren = (children, items) => {
  children.forEach((child) => {
    items.push(child);
  });
  if(isArray(items)) {
    return items;
  } else {
    return [];
  }
}
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
    // nodes = [];
    // levels = [];
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
        const children = getChildren(node);
        children.forEach((child) => {
          node.children.push(child);
        });
      });
      //console.log(filters);
      const tempNode = parseTree(filters.items[14]);
      console.log(JSON.stringify(tempNode));
      return filters;
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const parseTree = (node) => {

	let children = [];
	let cache = node.children;
  // console.log("node");
  // console.log(node.children);
	do {
		cache = parseBranch(cache);
		// if(cache.length > 0) {
      console.log("CACHE")
      console.log(cache)
			children = children.concat(cache);
		// }
	} while (cache.length > 0);
  //console.log(children);
  return children
}
const parseBranch = (children) => {
	let branch = [];
  // console.log("parseBranch");
	children.forEach((id)=> {
    // console.log(child)
    // let a = filters.items.filter((i) => i.id == child)
     branch = branch.concat(filters.items
    .filter((item) => item.id == id)
    .map((x) => {
      return x.children;
    }))
		// branch = branch.concat(child.children);
    // console.log(branch);
    // console.log(JSON.stringify(a));
	})
  // console.log("BRANCH");
  // console.log(branch);

	return branch
}

module.exports = {
  loadFilters,
};
