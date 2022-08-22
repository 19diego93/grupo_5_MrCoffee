window.addEventListener("load", function () {
  //! Buscador
  let btnShowSearch = document.getElementById("search");
  let coverCloseSearch = document.getElementById("cover-ctn-search");
  let btnCloseSearch = document.getElementById("close-search");
  //?
  let barsSearch = document.getElementById("ctn-bars-search");
  let inputSearch = document.getElementById("inputSearch");

  let dropdown = document.getElementById("deploy-menu");
  let btnShowMenu = document.getElementById("menu-deploy-1");
  let btnShowMenu_2 = document.getElementById("menu-deploy2");
  let btnCloseMenu = document.getElementById("menu-close-1");
  let btnCloseMenu_2 = document.getElementById("menu-close-2");
  //!

  //' Show Search
  btnShowSearch.addEventListener("click", function () {
    if (barsSearch.style.display != "flex") {
      barsSearch.style.display = "flex";
      coverCloseSearch.style.display = "block";
      inputSearch.focus();
    } else {
      barsSearch.style.display = "none";
      coverCloseSearch.style.display = "none";
      inputSearch.value = "";
    }
    dropdown.style.transform = "translateX(300px)";
    btnShowMenu.style.display = "block";
    btnShowMenu_2.style.display = "block";
    btnCloseMenu_2.style.display = "none";
    btnCloseMenu.style.display = "none";
  });

  //' Close Search
  coverCloseSearch.addEventListener("click", function () {
    barsSearch.style.display = "none";
    coverCloseSearch.style.display = "none";
    inputSearch.value = "";
  });
  btnCloseSearch.addEventListener("click", function () {
    barsSearch.style.display = "none";
    coverCloseSearch.style.display = "none";
    inputSearch.value = "";
  });
});
