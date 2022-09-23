window.addEventListener("load", () => {
  let orderID = document.querySelector("#orderID");
  let id = orderID.getAttribute("data-orderID");
  fetch(`/api/orders/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let orders_content = document.querySelector(".orders-content");

      data.orderDetail.forEach((element) => {
        orders_content.innerHTML += `
        <tr>
            <td data-title="Pedido">
                <span class="">#${id}</span>
            </td>
            <td data-title="Nombre">
                <span>${element.nombre}</time>
            </td>
            <td data-title="Precio_venta">
                <span>${element.precio_venta}</span>
            </td>
            <td data-title="Articulos">
                <span>${element.articulos}</span>
            </td>
        </tr>
        `;
      });
    });
});
