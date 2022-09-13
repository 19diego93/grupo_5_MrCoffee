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

  const formulario = document.querySelector("#formulario");
  const inputs = document.querySelectorAll("#formulario input");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    correo:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: {
      lower: new RegExp("(?=.*[a-z])"),
      upper: new RegExp("(?=.*[A-Z])"),
      number: new RegExp("(?=.*[0-9])"),
      special: new RegExp("(?=.*[!@#$%^&*])"),
    },
  };

  const campos = {
    fname: false,
    lname: false,
    email: false,
    password: false,
    confirmPsw: false,
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
      case "password":
        validation(expresiones.password, e.target.value, "password", 8, 65);
        break;
      case "confirmPsw":
        validation(expresiones.password, e.target.value, "confirmPsw", 8, 65);
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
    } else if (campo == "fname" || campo == "lname" || campo == "email") {
      if (!expresion.test(value)) {
        invalid(errFront, `Caracteres invalidos.`, inputStyle, campo);
      } else {
        valid(errFront, "", inputStyle, campo);
      }
    } else if (campo == "password" || campo == "confirmPsw") {
      if (!expresion.lower.test(value)) {
        invalid(
          errFront,
          `Debe tener mínimo una Minúscula. [a-z]`,
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
      } else if (campo == "password" || campo == "confirmPsw") {
        const inputPassword1 = document.getElementById("password");
        const inputPassword2 = document.getElementById("confirmPsw");
  
        const errFront1 = document.querySelector(`.passwordErrors`);
        const errFront2 = document.querySelector(`.confirmPswErrors`);
  
        if (inputPassword1.value !== inputPassword2.value) {
          invalid(
              errFront1,
            "Las contraseñas no coinciden.",
            inputPassword1,
            "password"
          );
          invalid(
              errFront2,
            "Las contraseñas no coinciden.",
            inputPassword2,
            "confirmPsw"
          );
        } else {
          valid(errFront1, "", inputPassword1, "password");
          valid(errFront2, "", inputPassword2, "confirmPsw");
        }
      } else {
        valid(errFront, "", inputStyle, campo);
      }
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("blur", validarFormulario);
    input.addEventListener("keyup", validarFormulario);
  });

  formulario.addEventListener("submit", (e) => {
    if (
      campos.fname &&
      campos.lname &&
      campos.email &&
      campos.password &&
      campos.confirmPsw
    ) {
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
