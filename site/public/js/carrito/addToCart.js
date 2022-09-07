window.addEventListener("load", () => {
  let buttonAdd = document.querySelector("#addToCart");
  let quantity = document.querySelector("#inputQuantity");
  let cartNumber = document.querySelector("#urlCart p");
  let stock;

  function productosEnElCarrito() {
    if (localStorage.carrito) {
      let value = 0;
      let carrito = JSON.parse(localStorage.carrito);
      carrito.forEach((e) => {
        value += e.quantity;
      });
      return value;
    } else {
      return 0;
    }
  }

  if (buttonAdd) {
    /* Api Initialization */
    fetch(`/api/product/${buttonAdd.dataset.id}`)
      .then((res) => res.json())
      .then((data) => {
        return (stock = data.stock);
      });

    buttonAdd.addEventListener("click", () => {
      /* Toastr Initialization */
      toastr.options = {
        positionClass: "toast-bottom-right",
        fadeIn: 300,
        fadeOut: 1000,
        timeOut: 3000,
        extendedTimeOut: 1000,
        showMethod: "slideDown",
      };

      if (stock == 0) {
        return toastr.error("Este producto se encuentra agotado");
      }

      if (quantity.value > stock) {
        return toastr.error(`El stock de este producto es de ${stock}`);
      }

      if (!localStorage.carrito) {
        localStorage.setItem(
          "carrito",
          JSON.stringify([
            { id: buttonAdd.dataset.id, quantity: parseInt(quantity.value) },
          ])
        );
        cartNumber.innerText = productosEnElCarrito();
        return toastr.success(
          `Se agregaron ${quantity.value} producto/s al carro`
        );
      }
      let carrito = JSON.parse(localStorage.carrito);
      let index = carrito.findIndex((prod) => prod.id == buttonAdd.dataset.id);

      if (index != -1) {
        carrito[index].quantity += parseInt(quantity.value);

        if (carrito[index].quantity > stock) {
          return toastr.error(`El stock de este producto es de ${stock}`);
        }
      } else {
        carrito.push({
          id: buttonAdd.dataset.id,
          quantity: parseInt(quantity.value),
        });
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      cartNumber.innerText = productosEnElCarrito();
      return toastr.success(
        `Se agregaron ${quantity.value} producto/s al carro`
      );
    });
  }

  cartNumber.innerText = productosEnElCarrito();
});
