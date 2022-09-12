window.addEventListener("load", function () {
  //! Configuracion del toastr
  toastr.options = {
    positionClass: "toast-bottom-right",
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 3000,
    extendedTimeOut: 1000,
    showMethod: "slideDown",
  };

  const formulario = document.getElementById("formulario");
  const inputs = document.querySelectorAll("#formulario input");

  const expresiones = {
    password: {
      lower: new RegExp("(?=.*[a-z])"),
      upper: new RegExp("(?=.*[A-Z])"),
      number: new RegExp("(?=.*[0-9])"),
      special: new RegExp("(?=.*[!@#$%^&*])"),
    },
  };

  const campos = {
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  };

  const invalid = (inputErr, messageErr, inputColor, campo) => {
    inputErr.innerHTML = `${messageErr}`;

    inputColor.classList.remove("is-valid");
    inputColor.classList.remove("is-valid-icon");
    inputColor.classList.add("is-invalid");
    inputColor.classList.add("is-invalid-icon");

    campos[campo] = false;
  };

  const valid = (inputErr, messageErr, inputColor, campo) => {
    inputErr.innerHTML = `${messageErr}`;

    inputColor.classList.remove("is-invalid");
    inputColor.classList.remove("is-invalid-icon");
    inputColor.classList.add("is-valid");
    inputColor.classList.add("is-valid-icon");

    campos[campo] = true;
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "oldPassword":
        validation(expresiones.password, e.target.value, "oldPassword", 8, 65);
        break;
      case "newPassword":
        validation(expresiones.password, e.target.value, "newPassword", 8, 65);
        break;
      case "confirmNewPassword":
        validation(
          expresiones.password,
          e.target.value,
          "confirmNewPassword",
          8,
          65
        );
        break;
    }
  };

  const validation = (expresion, value, campo, min, max) => {
    const errorsMessageBack = document.querySelector(`.${campo}ErrBack`);
    if (errorsMessageBack) {
      errorsMessageBack.innerHTML = "";
    }

    const errorsMessage = document.querySelector(`.${campo}Errors`);
    const inputColor = document.getElementById(`${campo}`);

    if (value.length < 1) {
      invalid(
        errorsMessage,
        "Este campo no puede estar vacío.",
        inputColor,
        campo
      );
    } else if (value.length < min) {
      invalid(
        errorsMessage,
        `Escribe al menos ${min} caracteres.`,
        inputColor,
        campo
      );
    } else if (value.length > max) {
      invalid(
        errorsMessage,
        `No puedes escribir más de ${max} caracteres.`,
        inputColor,
        campo
      );
    } else if (!expresion.lower.test(value)) {
      invalid(
        errorsMessage,
        "Debe tener mínimo una Minúscula. [a-z]",
        inputColor,
        campo
      );
    } else if (!expresion.upper.test(value)) {
      invalid(
        errorsMessage,
        `Debe tener mínimo una Mayúscula. [A-Z]`,
        inputColor,
        campo
      );
    } else if (!expresion.number.test(value)) {
      invalid(
        errorsMessage,
        `Debe tener mínimo un Número. [0-9]`,
        inputColor,
        campo
      );
    } else if (!expresion.special.test(value)) {
      invalid(
        errorsMessage,
        `Debe tener mínimo un Carácter especial. [!@#$%^&*]`,
        inputColor,
        campo
      );
    } else if (value.indexOf(" ") != -1) {
      invalid(
        errorsMessage,
        "La contraseña no puede contener espacios en blanco.",
        inputColor,
        campo
      );
    } else if (campo == "confirmNewPassword" || campo == "newPassword") {
      const inputPassword1 = document.getElementById("newPassword");
      const inputPassword2 = document.getElementById("confirmNewPassword");

      const errorsMessage1 = document.querySelector(`.newPasswordErrors`);
      const errorsMessage2 = document.querySelector(`.confirmNewPasswordErrors`);

      if (inputPassword1.value !== inputPassword2.value) {
        invalid(
            errorsMessage1,
          "Las contraseñas no coinciden.",
          inputPassword1,
          "newPassword"
        );
        invalid(
            errorsMessage2,
          "Las contraseñas no coinciden.",
          inputPassword2,
          "confirmNewPassword"
        );
      } else {
        valid(errorsMessage1, "", inputPassword1, "newPassword");
        valid(errorsMessage2, "", inputPassword2, "confirmNewPassword");
      }
    } else {
      valid(errorsMessage, "", inputColor, campo);
    }
  };

  // Traigo todos los input's
  inputs.forEach((input) => {
    // Ejecuto las funcionas si presiona una tecla o sale del campo.
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });

  formulario.addEventListener("submit", (e) => {
    if (campos.oldPassword && campos.newPassword && campos.confirmNewPassword) {
      e.submit();
    } else {
      e.preventDefault();
      toastr.error("Complete los campos del formulario.");
    }
  });
});
