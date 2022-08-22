window.addEventListener("load", function () {
  //! Menu
  let btnShowMenu = document.getElementById("menu-deploy-1");
  let btnShowMenu_2 = document.getElementById("menu-deploy2");

  let btnCloseMenu = document.getElementById("menu-close-1");
  let btnCloseMenu_2 = document.getElementById("menu-close-2");
  let btnCloseMenu_3 = document.getElementById("close-menu");
  let coverCloseSearch = document.getElementById("cover-ctn-search");

  let dropdown = document.getElementById("deploy-menu");
  let barsSearch = document.getElementById("ctn-bars-search");
  let inputSearch = document.getElementById("inputSearch");
  //!

  //' Show Menu
  btnShowMenu.addEventListener("click", function () {
    if (dropdown.style.transform != "translateX(0px)") {
      dropdown.style.transform = "translateX(0px)";
      dropdown.style.display = "block";
      coverCloseSearch.style.display = "block";
      btnCloseMenu.style.display = "block";
      btnShowMenu.style.display = "none";
    } else {
      dropdown.style.transform = "translateX(500px)";
      dropdown.style.display = "none";
      coverCloseSearch.style.display = "none";
      btnCloseMenu.style.display = "none";
      btnShowMenu.style.display = "block";
    }
    barsSearch.style.display = "none";
    inputSearch.value = "";
  });

  btnShowMenu_2.addEventListener("click", function () {
    if (dropdown.style.transform != "translateX(0px)") {
      dropdown.style.transform = "translateX(0px)";
      dropdown.style.display = "block";
      coverCloseSearch.style.display = "block";
      btnCloseMenu_2.style.display = "block";
      btnShowMenu_2.style.display = "none";
    } else {
      dropdown.style.transform = "translateX(500px)";
      dropdown.style.display = "none";
      coverCloseSearch.style.display = "none";
      btnCloseMenu_2.style.display = "none";
      btnShowMenu_2.style.display = "block";
    }
    barsSearch.style.display = "none";
    inputSearch.value = "";
  });
  //'

  //' Close Menu
  btnCloseMenu.addEventListener("click", function () {
    dropdown.style.transform = "translateX(500px)";
    dropdown.style.display = "none";
    coverCloseSearch.style.display = "none";
    btnShowMenu.style.display = "block";
    btnCloseMenu.style.display = "none";
  });

  btnCloseMenu_2.addEventListener("click", function () {
    dropdown.style.transform = "translateX(500px)";
    dropdown.style.display = "none";
    coverCloseSearch.style.display = "none";
    btnShowMenu_2.style.display = "block";
    btnCloseMenu_2.style.display = "none";
  });

  btnCloseMenu_3.addEventListener("click", function () {
    dropdown.style.transform = "translateX(500px)";
    dropdown.style.display = "none";
    coverCloseSearch.style.display = "none";
    btnShowMenu.style.display = "block";
    btnShowMenu_2.style.display = "block";
    btnCloseMenu_2.style.display = "none";
    btnCloseMenu.style.display = "none";
  });

  coverCloseSearch.addEventListener("click", function () {
    dropdown.style.transform = "translateX(500px)";
    dropdown.style.display = "none";
    coverCloseSearch.style.display = "none";
    btnShowMenu.style.display = "block";
    btnShowMenu_2.style.display = "block";
    btnCloseMenu_2.style.display = "none";
    btnCloseMenu.style.display = "none";
  });
  //'
});
