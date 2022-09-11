window.addEventListener("load", () => {
  let button = document.querySelector("#button-config");

  button.addEventListener("click", () => {
    button.classList.toggle("arrow");

    let height = 0;
    let menu = button.nextElementSibling;
    
    if (menu.clientHeight == "0") {
      height = menu.scrollHeight;
    }
    menu.style.height = `${height}px`;
  });
});
