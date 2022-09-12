window.addEventListener("load", function () {
  const formulario = document.getElementById("formulario");
  const inputs = document.querySelectorAll("#formulario input");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    correo:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // correo valido
    password: {
      lower: new RegExp("(?=.*[a-z])"),
      upper: new RegExp("(?=.*[A-Z])"),
      number: new RegExp("(?=.*[0-9])"),
      special: new RegExp("(?=.*[!@#$%^&*])"),
    },
  };

  const campos = {
    first_name: true,
    last_name: true,
    email: true,
    oldPassword: false,
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "fname":
        validation(expresiones.nombre, e.target.value, "first_name", 3, 40);
        break;
      case "lname":
        validation(expresiones.nombre, e.target.value, "last_name", 3, 40);
        break;
      case "email":
        validation(expresiones.correo, e.target.value, "email", 6, 100);
        break;
      case "oldPassword":
        validationPassword(expresiones.password, e.target, "oldPassword");
        break;
    }
  };

  const validation = (expresion, value, campo, min, max) => {
    const errorsMessage = document.querySelectorAll(`.${campo}Errors`);
    const inputColor = document.getElementById(`${campo}`);

    if (value == "") {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Vacio`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid");
      inputColor.classList.add("is-invalid-icon");
      campos[campo] = false;
    } else if (value.length < min) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Min`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid");
      inputColor.classList.add("is-invalid-icon");
      campos[campo] = false;
    } else if (value.length > max) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Max`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid");
      inputColor.classList.add("is-invalid-icon");
      campos[campo] = false;
    } else if (!expresion.test(value)) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Num`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid");
      inputColor.classList.add("is-invalid-icon");
      campos[campo] = false;
    } else {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      inputColor.classList.remove("is-invalid");
      inputColor.classList.remove("is-invalid-icon");
      inputColor.classList.add("is-valid");
      inputColor.classList.add("is-valid-icon");
      campos[campo] = true;
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
    let MessageAlert = document.getElementById("formulario__mensaje-alert");
    let MessageError = document.getElementById("formulario__mensaje-error");

    if (
      campos.first_name &&
      campos.last_name &&
      campos.email &&
      campos.oldPassword &&
      campos.newPassword &&
      campos.confirmNewPassword
    ) {
      e.submit();
    } else if (
      campos.first_name &&
      campos.last_name &&
      campos.email &&
      !campos.oldPassword &&
      campos.newPassword &&
      campos.confirmNewPassword
    ) {
      e.preventDefault();

      MessageAlert.classList.remove("displayBlock");
      MessageAlert.classList.add("displayNone");

      MessageError.classList.remove("displayNone");
      MessageError.classList.add("displayBlock");

      const errorsMessage = document.querySelector(`.oldPasswordPass`);
      errorsMessage.classList.remove("displayNone");
      errorsMessage.classList.add("displayBlock");

      const oldPassword = document.getElementById("oldPassword");
      oldPassword.classList.remove("is-valid");
      oldPassword.classList.add("is-invalid");
    } else {
      e.preventDefault();

      MessageAlert.classList.remove("displayBlock");
      MessageAlert.classList.add("displayNone");

      MessageError.classList.remove("displayNone");
      MessageError.classList.add("displayBlock");
    }
  });
});
