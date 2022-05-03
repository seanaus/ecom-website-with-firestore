
// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log("CALL INIT");
//     initialize();
// });
// const parentProductLevel = (productLevel) => {
//     console.log("parentProductLevel");
//     console.log("ProductLevel : " + productLevel);
//     if (productLevel != "" && productLevel.search("|")) {
//         console.log("ProductLevel : " + productLevel);
//         productLevel = productLevel.split("|");
//         productLevel.pop();
//     }
//     return productLevel
// }
// Sean Austin
// 13/01/2022
// ...
// initialize = () => {
//     console.log("INIT");
//     // const filterState = JSON.parse(localStorage.getItem("filterState"));
//     const btns = document.querySelectorAll("div[data-node-type='child']");
//     btns.forEach((btn) => {
//         if (btn) {
//             btn.addEventListener("click", filterAction);
//         }
//     });
    
    // if (filterState) {
    //     const level = filterState.level ? -1 : filterState.level;
    //     const productLevel = filterState.productLevel == undefined ? -1 : filterState.productLevel;
    //     // alert(`level = ${leve
    //     showSubFilters(level, productLevel, "UP");
    //     showSubFilters(level, productLevel,"DOWN");
    // } else {
    //     console.log("FFS");
    // }

    // addClass(btn, "isSelected");
// };

// Sean Austin
// 23/03/2022
// 
// const filterAction = (event) => {
//     console.log("FILTER ACTION");
    // data-node-type = "parent || child"
    // data-node-level = "1,2,3,4"
    // data-togglable = "true || false"
    // data-productLevel = "productLevel01,productLevel02" 
    // data-productGroupId = "'none' || productGroupId"
    // const btn = event.target;
    // const level = btn.attributes["data-node-level"].value;
    // const productLevel = btn.attributes["data-productLevel"].value;
    // const _parentProductLevel = parentProductLevel(productLevel);

    // console.log(`level: ${level}`);
    // console.log(`productLevel: ${productLevel}`);
    // console.log(`_parentProductLevel: ${_parentProductLevel}`);

    // clearSubFilters(level);
    // clearIsSelected(level);

    // const filterState = {
    //     level: level,
    //     productLevel: _parentProductLevel
    // };
    // localStorage.setItem("filterState", JSON.stringify(filterState));
    // window.location.href = `../products?productLevel=${productLevel}`;
    // showSubFilters(level, productLevel);
    // addClass(btn, "isSelected");
    
// };
// const clearSubFilters = (level) => {
//     const btns = document.querySelectorAll("div[data-node-type ='parent']");
//     btns.forEach((btn) => {
//         if (parseInt(btn.attributes["data-node-level"].value) > parseInt(level) && btn.attributes["data-togglable"]) {
//             addClass(btn,"hideMe")     
//         }
//     });
// };
// const saveFilterState = () => {
//     const btns = document.querySelectorAll("div[data-node-type ='parent']");
//     btns.forEach((btn) => {
//     });
// };
// const showSubFilters = (level,productLevel) => {
//     if (level != "-1" && productLevel != "-1") {
//         const btns = document.querySelectorAll("div[data-node-type ='parent']");
//         btns.forEach((btn) => {
//             if (parseInt(btn.attributes["data-node-level"].value) == parseInt(level) + 1 && btn.attributes["data-togglable"].value == 'true' && btn.attributes["data-productLevel"].value == productLevel) {
//                 removeClass(btn, "hideMe")
//             }
//         });  
//     }
// };
// const clearIsSelected = (level)=> {
//     const btns = document.querySelectorAll("div[data-node-type='child']");
//     btns.forEach((btn)=>{
//         if (parseInt(btn.attributes["data-node-level"].value) >= parseInt(level)) {
//             removeClass(btn,"isSelected")     
//         }
//     });
// }
// const removeClass = (element, className) => {
//   if (element) {
//     element.classList.remove(className);
//   }
// };
// const addClass = (element, className) => {
//   if (element) {
//     element.classList.add(className);
//   }
// };
// const applyFilter = (level) => {
//     if (parseInt(level)===1) {
        
//     }
//     if (parseInt(level)===2) {
        
//     }
//     if (parseInt(level)===3) {
        
//     }
// };