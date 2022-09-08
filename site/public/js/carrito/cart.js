window.addEventListener("load", () => {
  //! Toastr Initialization
  toastr.options = {
    positionClass: "toast-bottom-right",
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 3000,
    extendedTimeOut: 1000,
    showMethod: "slideDown",
  };

  //! Variables
  let cartRows = document.querySelector("#cartRows");
  let totalAmount = document.querySelector("#totalAmount");
  let btnVaciarCarrito = document.querySelector("#VaciarCarrito");
  let urlCart = document.querySelector("#urlCart p");

  //! Funciones
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

  function carritoVacio() {
    cartRows.innerHTML = `
    <div class="ErrorCartRows">
        <p>No tienes productos en el carrito.</p>
    </div>
  `;
  }

  function calcularTotal(products) {
    return products
      .reduce((acum, product) => (acum += product.price * product.quantity), 0)
      .toFixed(2);
  }

  btnVaciarCarrito.addEventListener("click", () => {
    if (localStorage.carrito) {
      localStorage.removeItem("carrito");
      totalAmount.innerHTML = "";
      cartRows.innerHTML = "";
      carritoVacio();
      urlCart.innerHTML = 0;

      return toastr.success("Se eliminaron los productos del carrito.");
    } else {
      return toastr.error("No hay productos para eliminar.");
    }
  });

  if (!localStorage.carrito || localStorage.carrito == "[]") {
    return carritoVacio();
  }

  let carrito = JSON.parse(localStorage.carrito);
  let products = [];

  carrito.forEach((item, index) => {
    fetch(`/api/product/${item.id}`)
      .then((res) => res.json())
      .then((product) => {
        if (product) {
          let porcentaje = ((product.price * product.offer) / 100).toFixed(2);
          let nuevoPrecio = (product.price - porcentaje).toFixed(2);
          let price = parseFloat(nuevoPrecio * item.quantity, 2).toFixed(2);
          cartRows.innerHTML += `
          <article class="datail-cart-product cart-border-botom" id="row${product.id}">
            <div class="container-detail-cart">
              <div class="img-product-cart">
                <picture>
                  <img src="/img/products/${product.image}" alt="" />
                </picture>
              </div>
              <div class="cart-name-price">
                <span class="cart-product-name">${product.name}</span>
                <span class="cart-product-price price${product.id}" data-price="${price}">$${price}</span>
              </div>
            </div>
            <div class="container-delete-quantity">
              <button id="cart-borrar-producto" data-id="${product.id}">
                <i class="fas fa-trash"></i>
              </button>
              <div class="container-quantity-cart">
                <button class="btnRestar" data-id="${product.id}"><i class="fas fa-minus"></i></button>
                <input type="number" value="${item.quantity}" class="inp${product.id}"/>
                <button class="btnSumar" data-id="${product.id}"><i class="fas fa-plus"></i></button>
              </div>
            </div>
          </article>
        `;
          products.push({
            productId: product.id,
            name: product.name,
            price: parseFloat(nuevoPrecio, 2),
            stock: product.stock,
            quantity: item.quantity,
          });
        }
      })
      .then(() => {
        totalAmount.innerHTML = `
        <p>Total:</p> 
        <p>$ ${calcularTotal(products)}</p>
        `;

        let btnRestar = document.querySelectorAll(".btnRestar");
        btnRestar.forEach((btn) => {
          btn.addEventListener("click", () => {
            //! Busco el producto y guardo su informacion.
            let producto;
            products.forEach((product) => {
              if (product.productId == btn.dataset.id) {
                return (producto = product);
              }
            });

            //! Traigo el input y compruebo si el stock sobrepasa
            let inp = document.querySelector(`.inp${producto.productId}`);

            if (inp.value <= 1) {
              return toastr.error(`No puedes descender más.`);
            }

            //! Traigo el precio y imprimo el nuevo precio.
            let price = document.querySelector(`.price${producto.productId}`);
            let dataPrice = parseFloat(price.dataset.price);
            let printPrice = (dataPrice - producto.price).toFixed(2);

            price.innerHTML = `$${printPrice}`;
            price.dataset.price = printPrice;

            //! Imprimo el nuevo precio.
            carrito.forEach((element) => {
              if (element.id == producto.productId) {
                element.quantity -= 1;
                inp.value = parseInt(inp.value) - 1;
              }
            });
            //! Resto cantidad en el array de products
            products.forEach((element) => {
              if (element.productId == producto.productId) {
                element.quantity -= 1
              }
            });

            //! Actualizo los nuevos datos en localStorage.
            localStorage.setItem("carrito", JSON.stringify(carrito));

            //! Actualizo las unidades en el carrito.
            let cartNumber = document.querySelector("#urlCart p");
            cartNumber.innerHTML = productosEnElCarrito();

            //! Actualizo el precio final.
            totalAmount.innerHTML = `
            <p>Total:</p> 
            <p>$ ${calcularTotal(products)}</p>
            `;

            toastr.warning(`Se eliminó un producto del carrito.`);
          });
        });

        let btnSumar = document.querySelectorAll(".btnSumar");
        btnSumar.forEach((btn) => {
          btn.addEventListener("click", () => {
            //! Busco el producto y guardo su informacion.
            let producto;
            products.forEach((product) => {
              if (product.productId == btn.dataset.id) {
                return (producto = product);
              }
            });

            //! Traigo el input y compruebo si el stock sobrepasa
            let inp = document.querySelector(`.inp${producto.productId}`);

            if (inp.value >= producto.stock) {
              return toastr.error(`No queda más stock.`);
            }

            //! Traigo el precio y imprimo el nuevo precio.
            let price = document.querySelector(`.price${producto.productId}`);
            let dataPrice = parseFloat(price.dataset.price);
            let printPrice = (dataPrice + producto.price).toFixed(2);

            price.innerHTML = `$${printPrice}`;
            price.dataset.price = printPrice;

            //! imprimo el nuevo precio.
            carrito.forEach((element) => {
              if (element.id == producto.productId) {
                element.quantity += 1;
                inp.value = parseInt(inp.value) + 1;
              }
            });
            //! Sumo cantidad en el array de products
            products.forEach((element) => {
              if (element.productId == producto.productId) {
                element.quantity += 1
              }
            });

            //! Actualizo los nuevos datos en localStorage.
            localStorage.setItem("carrito", JSON.stringify(carrito));

            //! Actualizo las unidades en el carrito.
            let cartNumber = document.querySelector("#urlCart p");
            cartNumber.innerHTML = productosEnElCarrito();

            //! Actualizo el precio final.
            totalAmount.innerHTML = `
            <p>Total:</p> 
            <p>$ ${calcularTotal(products)}</p>
            `;

            toastr.success(`Se agregó un ítem al carrito.`);
          });
        });

        let btnBorrar = document.querySelectorAll("#cart-borrar-producto");
        btnBorrar.forEach((btn) => {
          btn.addEventListener("click", () => {
            if (carrito.length > 1) {
              let data = [];
              carrito.forEach((element) => {
                if (btn.dataset.id !== element.id) {
                  return data.push(element);
                }
              });
              carrito = data;
              localStorage.setItem("carrito", JSON.stringify(carrito));

              nuevosProductos = [];
              products.forEach((element) => {
                if (btn.dataset.id !== element.productId) {
                  return nuevosProductos.push(element);
                }
              });
              products = nuevosProductos;

              document.getElementById(`row${btn.dataset.id}`).remove();

              totalAmount.innerHTML = `
              <p>Total:</p> 
              <p>$ ${calcularTotal(products)}</p>
              `;
            } else {
              //! Si hay 1 solo producto, elimino el carrito de localStorage.
              localStorage.removeItem("carrito");
              //! Vacio el array de productos.
              products = [];
              //! Vacio el precio total
              totalAmount.innerHTML = ``;
              //! Muestro el mensaje, El carrito esta vacio.
              carritoVacio();
            }

            //! Actualizo las unidades en el carrito.
            let cartNumber = document.querySelector("#urlCart p");
            cartNumber.innerHTML = productosEnElCarrito();

            toastr.success("Se borró el ítem del carrito.");
          });
        });
      });
  });

  
});
