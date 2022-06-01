//!
//!
//! Buscador
document.getElementById("search").addEventListener("click", mostrar_buscador);
document
  .getElementById("cover-ctn-search")
  .addEventListener("click", ocultar_buscador);
document
  .getElementById("close-search")
  .addEventListener("click", ocultar_buscador);

bars_search = document.getElementById("ctn-bars-search");
inputSearch = document.getElementById("inputSearch");
cover_ctn_search = document.getElementById("cover-ctn-search");

function mostrar_buscador() {
  bars_search.style.top = "60px";
  cover_ctn_search.style.display = "block";
  inputSearch.focus();
  dropdown.style.transform = "translateX(300px)";
}

function ocultar_buscador() {
  bars_search.style.top = "-60px";
  cover_ctn_search.style.display = "none";
  inputSearch.value = "";
}
//!
//!
//! Menu
document.getElementById("menu-deploy1").addEventListener("click", mostrar_menu);
document.getElementById("menu-deploy2").addEventListener("click", mostrar_menu);

document
  .getElementById("cover-ctn-search")
  .addEventListener("click", ocultar_menu);
document.getElementById("close-menu").addEventListener("click", ocultar_menu);
document.getElementById("close-menu-2").addEventListener("click", ocultar_menu);

let dropdown = document.getElementById("deploy-menu");
let cover_ctn = document.getElementById("cover-ctn-search");

function mostrar_menu() {
  dropdown.style.transform = "translateX(0px)";
  cover_ctn.style.display = "block";
  bars_search.style.top = "-60px";
  inputSearch.value = "";
}

function ocultar_menu() {
  dropdown.style.transform = "translateX(300px)";
  cover_ctn.style.display = "none";
}
