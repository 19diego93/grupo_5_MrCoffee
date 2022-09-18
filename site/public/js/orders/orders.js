window.addEventListener("load", () => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((data) => {
      let orders_content = document.querySelector(".orders-content");

      if (data.sales.length <= 0) {
        orders_content.innerHTML = `<tr><td> No se realizaron compras</td></tr>`;
        return false;
      }

      data.sales.forEach((element) => {
        orders_content.innerHTML = `
        <tr>
            <td data-title="Pedido">
                <a>#aaaaa</a>
            </td>
            <td data-title="Fecha">
                <time datetime="2022-06-29T09:48:36+00:00">*****</time>
            </td>
            <td data-title="MetodoDePago">
                <span>*****</span>
            </td>
            <td data-title="Cantidad">
                <span>***<span>
            </td>
            <td data-title="Total">
                <span>$***</span>
            </td>
        </tr>
        `;
      });
      console.log(data);
    });
});
