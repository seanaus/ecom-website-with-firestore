


// Sean Austin
// 13/01/2022
// ...
window.onload = () => {
    const btnBreaking = document.getElementById("breaking");
    const btnCars = document.getElementById("cars");
    const btnParts = document.getElementById("parts");
    const btnRestoring = document.getElementById("restoring");

    if (btnBreaking) {
        btnBreaking.addEventListener("click", productLevel01Action(btnBreaking));
    }
    
};
// Sean Austin
// 23/03/2022
// 
const productLevel01Action = (btn) => {
    const id = btn.id;
    const dataContainerLevel = btn.getAttribute()
    document.querySelector("tagName[attributeName='attributeValue']")
    // const dataContainerLevel = document.querySelector("data-container-level");
    // const dataSubContainerLevel = parseInt(btn.getAttribute("data-container-level"));
    console.log(dataContainerLevel);
    // const mnuSubContainers = document.querySelector(`data-container-level=${dataSubContainerLevel}`);
    // console.log(mnuSubContainers);
    // const menuItem = document.querySelectorAll("data-container-level" + dataContainerLevel+1 );
//   for (let i = 0; i < menuItem.length; i++) {
//     if (menuItem[i].href === currentPageUrl) {
//       if ((menuItem[i].className == "navPill navLink")) {
//         menuItem[i].className += " active";
//       }
//     }
//   }
};