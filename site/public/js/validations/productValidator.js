window.addEventListener("load", function () {
  const formulario = document.getElementById("formulario");
  const inputs = document.querySelectorAll("#formulario input");
  const textarea = document.querySelector("#formulario textarea");
  const select = document.querySelector("#formulario select");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]+$/, // Letras y espacios, pueden llevar acentos.
    numero: /^[0-9]+$/, // Valido solo numeros.
    category: /^[a-zA-Z]+$/,
  };


  const campos = {
    name: false,
    stock: false,
    price: false,
    offer: false,
    category: false,
    description: false,
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "name":
        validation(expresiones.nombre, e.target.value, "name", 5, 40);
        break;
      case "stock":
        validation(expresiones.numero, e.target.value, "stock", 1, 5);
        break;
      case "price":
        validation(expresiones.numero, e.target.value, "price", 2, 8);
        break;
      case "offer":
        validation(expresiones.numero, e.target.value, "offer", 1, 2);
        break;
      case "category":
        console.log(e.target.value);
        validation(expresiones.category, e.target.value, "category", 1, 40);
        break;
      case "description":
        validation(expresiones.nombre, e.target.value, "description", 20, 120);
        break;
    }
  };

  const validation = (expresion, value, campo, min, max) => {
    const errorsMessage = document.querySelectorAll(`.${campo}Errors`);
    const inputColor = document.getElementById(`${campo}`);

    if (value.length < 1) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Vacio`).classList.add("displayBlock");
      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");

      if (campo != "category") {
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");
      }
      campos[campo] = false;
    } else if (value.length < min) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Min`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");

      if (campo != "category") {
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");
      }
      campos[campo] = false;
    } else if (value.length > max) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Max`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");

      if (campo != "category") {
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");
      }
      campos[campo] = false;
    } else if (!expresion.test(value)) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document
        .querySelector(`.${campo}Caracters`)
        .classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");

      if (campo != "category") {
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");
      }
      campos[campo] = false;
    } else {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      inputColor.classList.remove("is-invalid");
      inputColor.classList.add("is-valid");

      if (campo != "category") {
        inputColor.classList.remove("is-invalid-icon");
        inputColor.classList.add("is-valid-icon");
      }
      campos[campo] = true;
    }
  };

  // Traigo todos los input's
  inputs.forEach((input) => {
    // Ejecuto las funcionas si presiona una tecla o sale del campo.
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
    input.addEventListener("click", validarFormulario);
  });
  // Ejecuto las funcionas si presiona una tecla o sale del campo.
  select.addEventListener("change", validarFormulario);
  select.addEventListener("click", validarFormulario);
  textarea.addEventListener("keyup", validarFormulario);
  textarea.addEventListener("click", validarFormulario);
  textarea.addEventListener("blur", validarFormulario);

  formulario.addEventListener("submit", (e) => {
    let MessageError = document.getElementById("formulario__mensaje-error");

    if (
      campos.name &&
      campos.stock &&
      campos.price &&
      campos.offer &&
      campos.category &&
      campos.description
    ) {
      e.submit();
    } else {
      e.preventDefault();

      MessageError.classList.remove("displayNone");
      MessageError.classList.add("displayBlock");

      inputs.forEach((input) => {
        let a = {
          target: { name: input.name, value: input.value },
        };
        validarFormulario(a);
      });
      let dataTextarea = {
        target: { name: textarea.name, value: textarea.value },
      };
      validarFormulario(dataTextarea);

      let dataSelect = { target: { name: select.name, value: select.value } };
      validarFormulario(dataSelect);
    }
  });
});
