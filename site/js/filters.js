
document.addEventListener('DOMContentLoaded', (event) => {
    initialize();
});

// Sean Austin
// 13/01/2022
// ...
initialize = () => {

    // const btnBreaking = document.getElementById("breaking");
    // const btnCars = document.getElementById("cars");
    // const btnParts = document.getElementById("parts");
    // const btnRestoring = document.getElementById("restoring");

    // if (btnBreaking) {
    //     btnBreaking.addEventListener("click", filterAction);
    // }
    // if (btnCars) {
    //     btnCars.addEventListener("click", filterAction);
    // }
    // if (btnParts) {
    //     btnParts.addEventListener("click", filterAction);
    // }
    // if (btnRestoring) {
    //     btnRestoring.addEventListener("click", filterAction);
    // }

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

    clearSubFilters(level);
    clearIsSelected(level);
    // const productLevels = btn.attributes["data-productLevel"].split(',');
    //const productLevels = productLevelArray(btn.attributes["data-productLevel"].value);
    const productLevel = btn.attributes["data-productLevel"].value;
    console.log(`productLevel ${productLevel}`);
    // productLevels.forEach((productLevel) => {
    //     console.log(`${level} - ${productLevel}`);
    //     showSubFilters(level, productLevel);
    // }); 
    showSubFilters(level, productLevel);
    addClass(btn,"isSelected");
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
    // console.log(`showSubFilters - ${level} - ${productLevel}`);
    const btns = document.querySelectorAll("div[data-node-type ='parent']");
    // console.log(btns);
    btns.forEach((btn) => {
        if (parseInt(btn.attributes["data-node-level"].value) == parseInt(level) + 1 && btn.attributes["data-togglable"].value == 'true' && btn.attributes["data-productLevel"].value == productLevel) {
            removeClass(btn,"hideMe")     
        }
    });
};
const productLevelArray = (productLevels) => {
    const isArray = productLevels.search(",");
    // console.log(isArray);
    if (isArray>0) {
        return productLevels.split(",")
    } else {
        const tempArray = [];
        console.log(productLevels);
        tempArray.push(productLevels);
                // console.log(tempArray);
        return tempArray
    }
};
// const hideFilters = () => {
//     const btns = document.querySelectorAll("div[data-container-level]");
//     btns.forEach((btn) => {
//         if (btn.attributes["data-container-level"].value !== "1") {
//             addClass(btn,"hideMe")     
//         }
//     });
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