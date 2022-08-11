window.addEventListener("load", function () {
  //! Menu
  let btnShowMenu = document.getElementById("menu-deploy1");
  let btnShowMenu_2 = document.getElementById("menu-deploy2");

  let btnCloseMenu = document.getElementById("close-menu");
  let btnCloseMenu_2 = document.getElementById("close-menu-2");
  let coverCloseSearch = document.getElementById("cover-ctn-search");
  //?
  let dropdown = document.getElementById("deploy-menu");
  let barsSearch = document.getElementById("ctn-bars-search");
  let inputSearch = document.getElementById("inputSearch");
  //!

  //' Show Menu
  btnShowMenu.addEventListener("click", function () {
    if (dropdown.style.transform != "translateX(0px)") {
      dropdown.style.transform = "translateX(0px)";
      coverCloseSearch.style.display = "block";
      if (dropdown.style.display != "flex") {
        dropdown.style.display = "flex";
      }
    } else {
      dropdown.style.transform = "translateX(500px)";
      coverCloseSearch.style.display = "none";
    }
    barsSearch.style.top = "-90px";
    inputSearch.value = "";
  });

  btnShowMenu_2.addEventListener("click", function () {
    if (dropdown.style.transform != "translateX(0px)") {
      dropdown.style.transform = "translateX(0px)";
      coverCloseSearch.style.display = "block";
      if (dropdown.style.display != "flex") {
        dropdown.style.display = "flex";
      }
    } else {
      dropdown.style.transform = "translateX(500px)";
      coverCloseSearch.style.display = "none";
    }
    barsSearch.style.top = "-90px";
    inputSearch.value = "";
  });
  //'

  //' Close Menu
  btnCloseMenu.addEventListener("click", function () {
    dropdown.style.transform = "translateX(500px)";
    coverCloseSearch.style.display = "none";
  });

  btnCloseMenu_2.addEventListener("click", function () {
    dropdown.style.transform = "translateX(500px)";
    coverCloseSearch.style.display = "none";
  });

  coverCloseSearch.addEventListener("click", function () {
    dropdown.style.transform = "translateX(500px)";
    coverCloseSearch.style.display = "none";
  });
  //'
});
