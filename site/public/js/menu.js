window.addEventListener("load", function () {
  // Todas las listas
  let listElements = document.querySelectorAll(".list__button--click");

  // Recorro una por una
  listElements.forEach((listElement) => {
    // Les agrego un evento
    listElement.addEventListener("click", () => {
      listElement.classList.toggle("arrow");

      listElements.forEach((listElementHeight) => {
        if (listElement != listElementHeight) {
          let menuHeight = listElementHeight.nextElementSibling;
          menuHeight.style.height = `0px`;
          listElementHeight.classList.remove("arrow");
        }
      });

      let height = 0;
      let menu = listElement.nextElementSibling;
      if (menu.clientHeight == "0") {
        height = menu.scrollHeight;
      }

      menu.style.height = `${height}px`;
    });
  });

  // Boton cerrar sesion
  let logout = document.querySelector("#logoutUser");
  let cartNumber = document.querySelector("#urlCart p");

  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      cartNumber.innerHTML = "0";
    });
  }

});
