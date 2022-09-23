window.addEventListener("load", () => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((data) => {
      let orders_content = document.querySelector(".orders-content");

      if (data.sales.length <= 0) {
        let orders = document.querySelector('.orders')
        orders.innerHTML = `<h1 class="noOrders"> No se realizaron compras </h1>`;
        return false;
      }

      data.sales.forEach((element) => {
        orders_content.innerHTML += `
        <tr>
            <td data-title="Pedido">
                <a href="/user/profile/orders/${element.id}" class="${element.Venta_estado.estado}">#${element.id}</a>
            </td>
            <td data-title="Fecha" class="time-order">
                <time datetime="${element.cobrado}">${element.cobrado}</time>
            </td>
            <td data-title="MetodoDePago">
                <span>${element.metodoDePago}</span>
            </td>
            <td data-title="Cantidad">
                <span>${element.cantidad}</span>
            </td>
            <td data-title="Total" class="total-order">
                <span>$${element.total}</span>
            </td>
        </tr>
        `;
      });
    });
});
