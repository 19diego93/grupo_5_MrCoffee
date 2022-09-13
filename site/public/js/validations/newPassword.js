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
    const errBackEnd = document.querySelector(`.${campo}ErrBack`);
    if (errBackEnd) {
      errBackEnd.innerHTML = "";
    }

    const errFront = document.querySelector(`.${campo}Errors`);
    const inputStyle = document.getElementById(`${campo}`);

    if (value.length < 1) {
      invalid(
        errFront,
        "Este campo no puede estar vacío.",
        inputStyle,
        campo
      );
    } else if (value.length < min) {
      invalid(
        errFront,
        `Escribe al menos ${min} caracteres.`,
        inputStyle,
        campo
      );
    } else if (value.length > max) {
      invalid(
        errFront,
        `No puedes escribir más de ${max} caracteres.`,
        inputStyle,
        campo
      );
    } else if (!expresion.lower.test(value)) {
      invalid(
        errFront,
        "Debe tener mínimo una Minúscula. [a-z]",
        inputStyle,
        campo
      );
    } else if (!expresion.upper.test(value)) {
      invalid(
        errFront,
        `Debe tener mínimo una Mayúscula. [A-Z]`,
        inputStyle,
        campo
      );
    } else if (!expresion.number.test(value)) {
      invalid(
        errFront,
        `Debe tener mínimo un Número. [0-9]`,
        inputStyle,
        campo
      );
    } else if (!expresion.special.test(value)) {
      invalid(
        errFront,
        `Debe tener mínimo un Carácter especial. [!@#$%^&*]`,
        inputStyle,
        campo
      );
    } else if (value.indexOf(" ") != -1) {
      invalid(
        errFront,
        "La contraseña no puede contener espacios en blanco.",
        inputStyle,
        campo
      );
    } else if (campo == "confirmNewPassword" || campo == "newPassword") {
      const inputPassword1 = document.getElementById("newPassword");
      const inputPassword2 = document.getElementById("confirmNewPassword");

      const errFront1 = document.querySelector(`.newPasswordErrors`);
      const errFront2 = document.querySelector(`.confirmNewPasswordErrors`);

      if (inputPassword1.value !== inputPassword2.value) {
        invalid(
            errFront1,
          "Las contraseñas no coinciden.",
          inputPassword1,
          "newPassword"
        );
        invalid(
            errFront2,
          "Las contraseñas no coinciden.",
          inputPassword2,
          "confirmNewPassword"
        );
      } else {
        valid(errFront1, "", inputPassword1, "newPassword");
        valid(errFront2, "", inputPassword2, "confirmNewPassword");
      }
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

  formulario.addEventListener("submit", (e) => {
    if (campos.oldPassword && campos.newPassword && campos.confirmNewPassword) {
      e.submit();
    } else {
      e.preventDefault();
      
      inputs.forEach((input) => {
        let values = {
          target: { name: input.name, value: input.value },
        };
        validarFormulario(values);
      });

      toastr.error("La información ingresada no es válida.");
    }
  });
});
