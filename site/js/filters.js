// const { remove } = require("local-storage");

window.onload = () => {
  initialize();
};
const initialize = () => {
  const btns = document.querySelectorAll("div[data-node-type='CHILD']");
  btns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", filterAction);
    }
  });
};
const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};
const addClass = (element, className) => {
  if (element) {
    element.classList.add(className);
  }
};
const calcSubLevel = (level) => {
  return parseInt(level) + 1;
}
const clearSubFilters = (level) => {
    const btns = document.querySelectorAll("div[data-node-type ='PARENT']");
    btns.forEach((btn) => {
        if (parseInt(btn.attributes["data-node-level"].value) > parseInt(level) && btn.attributes["data-node-toggle"]) {
            addClass(btn,"hideMe")
        }
    });
};
const showSubFilters = (level, Id) => {
  clearSubFilters(level);
  const subLevel = calcSubLevel(level);
  const subSelector = `div[data-node-level='${subLevel}'][data-node-parentId='${Id}'][data-node-type='PARENT'][data-node-toggle='true']`;
  const subParent = document.querySelector(subSelector);
  if (subParent) removeClass(subParent, "hideMe");
}
const clearIsSelected = (level)=> {
  const selector = `div[data-node-type='CHILD']`;
  const btn = document.querySelectorAll(selector);
  btn.forEach((btn) => {
    if (btn) {
      if (parseInt(btn.attributes["data-node-level"].value) >= parseInt(level)) {
        removeClass(btn, "isSelected");
      }
    }
  });
}
const isSelected = (btn) => {
  const level = btn.attributes["data-node-level"].value;
  clearIsSelected(level);
  if (btn) addClass(btn, "isSelected");
}
const filterAction = (event) => {
  // Activated Child
  const btn = event.target;
  const Id = btn.attributes["data-node-id"].value;
  const level = btn.attributes["data-node-level"].value;
  const name = btn.attributes["data-node-name"].value;
  const parentId = btn.attributes["data-node-parentId"].value;
  const children = JSON.parse(btn.attributes["data-node-children"].value);
  const type = btn.attributes["data-node-type"].value;

  showSubFilters(level,Id);
  isSelected(btn);
  //removeFilters();
  applyFilters(children);
 
};
// const removeFilters = ()=> {
//   const selector = "a[data-node-type='product']";
//   const products = document.querySelectorAll(selector);
//   //console.log("REMOVE FILTERS");
//   // console.log(JSON.stringify(products));
//   products.forEach((product) => {
//     removeClass(product, "hideMe");
//   });
// }
const applyFilters = (children)=> {
  // let selector = `a[data-node-type='product'][data-node-productlevelid='${productLevelId}']`;
  let selector = `a[data-node-type='product']`;
  let products = document.querySelectorAll(selector);
  let productLevelId = 0;

  products.forEach((product) => {
    productLevelId = parseInt(product.attributes["data-node-productlevelid"].value);
    if(children.includes(productLevelId)) {
      removeClass(product, "hideMe");
    } else {
      addClass(product, "hideMe");
    }
  });
}
const applyFiltersl = (children) => {
  let selector = `a[data-node-type='product'][data-node-productlevelid='${productLevelId}']`;

  children.forEach((productLevelId)=>{
    // selector = `a[data-node-type='product'][data-node-productlevelid='${productLevelId}']`;
    const products = document.querySelectorAll(selector)
    products.forEach((product)=>{
      addClass(product, "hideMe");
    })
  })
}
