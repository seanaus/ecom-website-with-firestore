
document.addEventListener('DOMContentLoaded', (event) => {
    initialize();
});

// Sean Austin
// 13/01/2022
// ...
initialize = () => {
    const btns = document.querySelectorAll("div[data-node-type='child']");
    btns.forEach((btn) => {
        if (btn) {
            btn.addEventListener("click", filterAction);
        }
    });
};

// Sean Austin
// 23/03/2022
// 
const filterAction = (event) => {
    // data-node-type = "parent || child"
    // data-node-level = "1,2,3,4"
    // data-togglable = "true || false"
    // data-productLevel = "productLevel01,productLevel02" 
    // data-productGroupId = "'none' || productGroupId"
    const btn = event.target;
    const level = btn.attributes["data-node-level"].value;
    const productLevel = btn.attributes["data-productLevel"].value;
    console.log(`productLevel is ${productLevel}`);
    clearSubFilters(level);
    clearIsSelected(level);
    showSubFilters(level, productLevel);
    addClass(btn, "isSelected");
    window.location.href = `../products?productLevel=${productLevel}`;
    
};
const clearSubFilters = (level) => {
    const btns = document.querySelectorAll("div[data-node-type ='parent']");
    btns.forEach((btn) => {
        if (parseInt(btn.attributes["data-node-level"].value) > parseInt(level) && btn.attributes["data-togglable"]) {
            addClass(btn,"hideMe")     
        }
    });
};
const showSubFilters = (level, productLevel) => {
    const btns = document.querySelectorAll("div[data-node-type ='parent']");
    btns.forEach((btn) => {
        if (parseInt(btn.attributes["data-node-level"].value) == parseInt(level) + 1 && btn.attributes["data-togglable"].value == 'true' && btn.attributes["data-productLevel"].value == productLevel) {
            removeClass(btn,"hideMe")     
        }
    });
};
// const productLevelArray = (productLevels) => {
//     const isArray = productLevels.search(",");
//     if (isArray>0) {
//         return productLevels.split(",")
//     } else {
//         const tempArray = [];
//         console.log(productLevels);
//         tempArray.push(productLevels);
//         return tempArray
//     }
// };
const clearIsSelected = (level)=> {
    const btns=document.querySelectorAll("div[data-node-type='child']");
    btns.forEach((btn)=>{
        if (parseInt(btn.attributes["data-node-level"].value) >= parseInt(level)) {
            removeClass(btn,"isSelected")     
        }
    });
}
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
const applyFilter = (level) => {
    if (parseInt(level)===1) {
        
    }
    if (parseInt(level)===2) {
        
    }
    if (parseInt(level)===3) {
        
    }
};