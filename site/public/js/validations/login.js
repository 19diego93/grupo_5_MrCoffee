window.addEventListener("load", () => {
  //! Configuracion del toastr
  toastr.options = {
    positionClass: "toast-bottom-right",
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 3000,
    extendedTimeOut: 1000,
    showMethod: "slideDown",
  };

  const formulario = document.querySelector(".form-style");
  const inputs = document.querySelectorAll(".form-style input");

  const expresiones = {
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
    email: false,
    passwd: false,
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
      case "email":
        validation(expresiones.correo, e.target.value, "email", 6, 100);
        break;
      case "password":
        validation(expresiones.password, e.target.value, "passwd", 8, 65);
        break;
    }
  };

  function validation(expresion, value, campo, min, max) {
    const errBackEnd = document.querySelector(`.${campo}ErrBack`);
    if (errBackEnd) {
      errBackEnd.innerHTML = "";
    }

    const errFront = document.querySelector(`.${campo}Errors`);
    const inputStyle = document.getElementById(`${campo}`);

    if (value.length < 1) {
      invalid(errFront, "Este campo no puede estar vacío.", inputStyle, campo);
    } else if (value.length < min) {
      invalid(errFront, `Escribe al menos ${min} caracteres.`, inputStyle, campo);
    } else if (value.length > max) {
      invalid(errFront, `No puedes escribir más de ${max} caracteres.`, inputStyle, campo);
    } else if (campo == "email") {
      if (!expresion.test(value)) {
        invalid(errFront, "El email ingresado no es válido.", inputStyle, campo);
      } else {
        valid(errFront, "", inputStyle, campo);
      }
    } else if (campo == "passwd") {
      if (!expresion.lower.test(value)) {
        invalid(errFront, "Debe tener mínimo una Minúscula. [a-z]", inputStyle, campo);
      } else if (!expresion.upper.test(value)) {
        invalid(errFront, "Debe tener mínimo una Mayúscula. [A-Z]", inputStyle, campo);
      } else if (!expresion.number.test(value)) {
        invalid(errFront, "Debe tener mínimo un Número. [0-9]", inputStyle, campo);
      } else if (!expresion.special.test(value)) {
        invalid(errFront, "Debe tener mínimo un Carácter especial. [!@#$%^&*]", inputStyle, campo);
      } else {
        let ValidaEspacios = value.indexOf(" ");
        if (ValidaEspacios == -1) {
          valid(errFront, "", inputStyle, campo);
        } else {
          invalid(errFront, "La contraseña no puede contener espacios en blanco.", inputStyle, campo);
        }
      }
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("blur", validarFormulario);
    input.addEventListener("keyup", validarFormulario);
  });

  formulario.addEventListener("submit", (e) => {
    if (campos.email && campos.passwd) {
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
