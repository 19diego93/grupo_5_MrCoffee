window.addEventListener("load", () => {
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
    const errorsMessageBack = document.querySelector(`.${campo}ErrBack`);
    if(errorsMessageBack){
      errorsMessageBack.innerHTML = ""
    }

    const errorsMessage = document.querySelector(`.${campo}Errors`);
    const inputColor = document.getElementById(`${campo}`);
    if (value.length < 1) {
      errorsMessage.innerHTML = "Este campo no puede estar vacío."

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid-icon");

      campos[campo] = false;
    } else if (value.length < min) {
      errorsMessage.innerHTML = `Escribe al menos ${min} caracteres.`

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid-icon");

      campos[campo] = false;
    } else if (value.length > max) {
      errorsMessage.innerHTML = `No puedes escribir más de ${max} caracteres.`

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      inputColor.classList.remove("is-valid-icon");
      inputColor.classList.add("is-invalid-icon");

      campos[campo] = false;
    } else if (campo == "email") {
      if (!expresion.test(value)) {
        errorsMessage.innerHTML = `El email ingresado no es válido.`

        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else {
        errorsMessage.innerHTML = ""

        inputColor.classList.remove("is-invalid");
        inputColor.classList.remove("is-invalid-icon");
        inputColor.classList.add("is-valid");
        inputColor.classList.add("is-valid-icon");
        
        campos[campo] = true;
      }
    } else if (campo == "passwd") {
      if (!expresion.lower.test(value)) {
        errorsMessage.innerHTML = `Debe tener mínimo una Minúscula. [a-z]`

        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else if (!expresion.upper.test(value)) {
        errorsMessage.innerHTML = `Debe tener mínimo una Mayúscula. [A-Z]`

        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else if (!expresion.number.test(value)) {
        errorsMessage.innerHTML = `Debe tener mínimo un Número. [0-9]`

        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else if (!expresion.special.test(value)) {
        errorsMessage.innerHTML = `Debe tener mínimo un Carácter especial. [!@#$%^&*]`

        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");
        inputColor.classList.remove("is-valid-icon");
        inputColor.classList.add("is-invalid-icon");

        campos[campo] = false;
      } else {
        let ValidaEspacios = value.indexOf(" ")
        if(ValidaEspacios == -1){
          errorsMessage.innerHTML = ""

          inputColor.classList.remove("is-invalid");
          inputColor.classList.remove("is-invalid-icon");
          inputColor.classList.add("is-valid");
          inputColor.classList.add("is-valid-icon");
          campos[campo] = true;
        }else{
          errorsMessage.innerHTML = "La contraseña no puede contener espacios en blanco."

          inputColor.classList.remove("is-valid");
          inputColor.classList.add("is-invalid");
          inputColor.classList.remove("is-valid-icon");
          inputColor.classList.add("is-invalid-icon");

          campos[campo] = false;
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
    }
  });
});
