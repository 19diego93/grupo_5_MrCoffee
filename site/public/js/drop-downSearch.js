window.addEventListener("load", function () {
  //! Buscador
  let btnShowSearch = document.getElementById("search");
  let coverCloseSearch = document.getElementById("cover-ctn-search");
  let btnCloseSearch = document.getElementById("close-search");
  //?
  let barsSearch = document.getElementById("ctn-bars-search");
  let inputSearch = document.getElementById("inputSearch");
  let dropdown = document.getElementById("deploy-menu");
  //!

  //' Show Search
  btnShowSearch.addEventListener("click", function () {
    if (barsSearch.style.top != "60px") {
      barsSearch.style.top = "60px";
      coverCloseSearch.style.display = "block";
      inputSearch.focus();
    } else {
      barsSearch.style.top = "-90px";
      coverCloseSearch.style.display = "none";
      inputSearch.value = "";
    }
    dropdown.style.transform = "translateX(300px)";
  });

  //' Close Search
  coverCloseSearch.addEventListener("click", function () {
    barsSearch.style.top = "-90px";
    coverCloseSearch.style.display = "none";
    inputSearch.value = "";
  });
  btnCloseSearch.addEventListener("click", function () {
    barsSearch.style.top = "-90px";
    coverCloseSearch.style.display = "none";
    inputSearch.value = "";
  });
});
