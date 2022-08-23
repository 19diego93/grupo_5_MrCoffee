window.addEventListener("load", () => {
  const formulario = document.querySelector(".form-login");
  const inputs = document.querySelectorAll(".form-login input");

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
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid-icon");

      campos[campo] = false;
    } else if (value.length < min) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Min`).classList.add("displayBlock");
      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid-icon");

      campos[campo] = false;
    } else if (value.length > max) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Max`).classList.add("displayBlock");
      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid-icon");

      campos[campo] = false;
    } else if (campo == "email") {
      if (!expresion.test(value)) {
        errorsMessage.forEach((error) => {
          error.classList.remove("displayBlock");
          error.classList.add("displayNone");
        });

        document
          .querySelector(`.${campo}Caracters`)
          .classList.add("displayBlock");
        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
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
    } else if (campo == "passwd") {
      if (!expresion.lower.test(value)) {
        errorsMessage.forEach((error) => {
          error.classList.remove("displayBlock");
          error.classList.add("displayNone");
        });

        document.querySelector(`.${campo}Lower`).classList.add("displayBlock");
        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else if (!expresion.upper.test(value)) {
        errorsMessage.forEach((error) => {
          error.classList.remove("displayBlock");
          error.classList.add("displayNone");
        });

        document.querySelector(`.${campo}Upper`).classList.add("displayBlock");
        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else if (!expresion.number.test(value)) {
        errorsMessage.forEach((error) => {
          error.classList.remove("displayBlock");
          error.classList.add("displayNone");
        });

        document.querySelector(`.${campo}Number`).classList.add("displayBlock");
        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else if (!expresion.special.test(value)) {
        errorsMessage.forEach((error) => {
          error.classList.remove("displayBlock");
          error.classList.add("displayNone");
        });

        document
          .querySelector(`.${campo}Special`)
          .classList.add("displayBlock");
        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
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
        let a = {
          target: { name: input.name, value: input.value },
        };
        validarFormulario(a);
      });
    }
  });
});
