window.addEventListener("load", () => {
  let button = document.querySelector("#button-config");
  let list_show = document.querySelector('.list_show')

  button.addEventListener("click", () => {
    button.classList.toggle("arrow");

    list_show.classList.toggle('list_height');
    // if (list_height.clientHeight == "0") {
    //   height = list_height.scrollHeight;
    // }

  });
});
