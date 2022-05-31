document.getElementById("menu-deploy1").addEventListener("click", mostrar_menu);
document.getElementById("menu-deploy2").addEventListener("click", mostrar_menu);

document
  .getElementById("cover-ctn-search")
  .addEventListener("click", ocultar_menu);
document.getElementById("close-menu").addEventListener("click", ocultar_menu);
document.getElementById("close-menu-2").addEventListener("click", ocultar_menu);

let dropdown = document.getElementById("deploy-menu");
let cover_ctn_search = document.getElementById("cover-ctn-search");

function mostrar_menu() {
  dropdown.style.transform = "translateX(0px)";
  cover_ctn_search.style.display = "block";
}

function ocultar_menu() {
  dropdown.style.transform = "translateX(300px)";
  cover_ctn_search.style.display = "none";
}
