"use strict";
const firebase = require("../db");
const firestore = firebase.firestore();
const { loadConfig } = require("../core/config");
const FilterItem = require("../models/FilterItem");

const IsArray = ((aryCheck) => {
    return (aryCheck && Array.isArray(aryCheck) && aryCheck.length > 0)
});
const getChildren = ((node)=> {
	const children = nodes.filter(check => check.parentId === node.id).map((child) => { return child.id});
    if(IsArray(children)) {
    	return children
    } else {
    	return []
    }
});

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
    const children = getChildren(node)
    if (IsArray(children)) {
        children.forEach((child) => {
            items.push(child)
        })
    }
    return items
}
const editNode = (srcObj, values) => {
    return Object.assign(srcObj, { children: values });
}
const loadFilters = async () => {
    let nodes = [];
    try {

        const filters = await loadConfig("filters");
        filters.items.forEach((item, idx) => {
            const node = new FilterItem(
                item.id,
                item.level,
                item.name,
                item.parentId
            );
            nodes.push(node);
            // console.log(JSON.stringify(idx + " : " + item.id)); 
        });
        




        // const nodes = filters.items
        // console.log(JSON.stringify(filters));
/*         data.forEach((node, idx) => {
            let children = [];
            children = parse(node);
            children = IsArray(children) ? children : [-1];
            nodes[idx] = editNode(nodes[idx], children);
            console.log(JSON.stringify(nodes[idx]));
        }); */
        // return nodes
        return nodes;
    } catch(error) {
        console.log(error.message);
        return []
    }
    // return nodes
}
module.exports = {
    loadFilters
}