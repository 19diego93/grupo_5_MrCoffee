window.addEventListener("load", function () {
  const formulario = document.getElementById("formulario");
  const inputs = document.querySelectorAll("#formulario input");

  const expresiones = {
    // Letras y espacios, pueden llevar acentos.
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    // correo valido
    correo:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  const campos = {
    fname: true,
    lname: true,
    email: true,
  };

  const invalid = (errFront, messageErr, inputStyle, campo) => {
    errFront.innerHTML = `${messageErr}`;

    inputStyle.classList.remove("is-valid");
    inputStyle.classList.remove("is-valid-icon");
    inputStyle.classList.add("is-invalid");
    inputStyle.classList.add("is-invalid-icon");

    campos[campo] = false;
  };

  const valid = (errFront, messageErr, inputStyle, campo) => {
    errFront.innerHTML = `${messageErr}`;

    inputStyle.classList.remove("is-invalid");
    inputStyle.classList.remove("is-invalid-icon");
    inputStyle.classList.add("is-valid");
    inputStyle.classList.add("is-valid-icon");

    campos[campo] = true;
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "fname":
        validation(expresiones.nombre, e.target.value, "fname", 3, 40);
        break;
      case "lname":
        validation(expresiones.nombre, e.target.value, "lname", 3, 40);
        break;
      case "email":
        validation(expresiones.correo, e.target.value, "email", 6, 100);
        break;
    }
  };

  const validation = (expresion, value, campo, min, max) => {
    const errBackEnd = document.querySelector(`.${campo}ErrBack`);
    if (errBackEnd) {
      errBackEnd.innerHTML = "";
    }

    const errFront = document.querySelector(`.${campo}Errors`);
    const inputStyle = document.getElementById(`${campo}`);

    if (value.length <= 0) {
      invalid(errFront, "Este campo no puede estar vacío.", inputStyle, campo);
    } else if (value.length < min) {
      invalid(errFront, `Escribe al menos ${min} caracteres.`, inputStyle, campo);
    } else if (value.length > max) {
      invalid(errFront, `No puedes escribir más de ${max} caracteres.`, inputStyle, campo);
    } else if (!expresion.test(value)) {
      invalid(errFront, "Los caracteres ingresados no son válidos.", inputStyle, campo);
    } else {
      valid(errFront, "", inputStyle, campo);
    }
  };

  // Traigo todos los input's
  inputs.forEach((input) => {
    // Ejecuto las funcionas si presiona una tecla o sale del campo.
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });

  // Si la variable <campos> se encuentra todo en true paso
  formulario.addEventListener("submit", (e) => {
    if (campos.fname && campos.lname && campos.email) {
      e.submit();
    } else {
      e.preventDefault();
      toastr.error("La información ingresada no es válida.");
    }
  });
});
