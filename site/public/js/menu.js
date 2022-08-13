window.addEventListener("load", function () {
  let listElements = document.querySelectorAll(".list__button--click");

  listElements.forEach((listElement) => {
    listElement.addEventListener("click", () => {
      let myList = listElement;
      myList.classList.toggle("arrow");

      listElements.forEach((listElementHeight) => {
        if (myList != listElementHeight) {
          let menuHeight = listElementHeight.nextElementSibling;
          menuHeight.style.height = `0px`;
        }
      });

      let height = 0;
      let menu = myList.nextElementSibling;
      if (menu.clientHeight == "0") {
        height = menu.scrollHeight;
      }

      menu.style.height = `${height}px`;
    });
  });
});
