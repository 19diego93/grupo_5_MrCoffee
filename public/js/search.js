document.getElementById("search").addEventListener("click", mostrar_buscador);
document.getElementById("search-2").addEventListener("click", mostrar_buscador);
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
}

function ocultar_buscador() {
  bars_search.style.top = "-30px";
  cover_ctn_search.style.display = "none";
  inputSearch.value = "";
}
