window.addEventListener("load", () => {
  const formulario = document.querySelector("#formulario");
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
    fname: false,
    lname: false,
    email: false,
    passwd: false,
    confirmPsw: false,
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
        validation(expresiones.password, e.target.value, "passwd", 8, 65);
        validation_2();
        break;
      case "confirmPsw":
        validation_2();
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
    } else if(campo != "passwd"){
      if (!expresion.test(value)) {
        errorsMessage.innerHTML = `Caracteres invalidos.`
  
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

  const validation_2 = () => {
    const errorsMessageBack = document.querySelector('.confirmPswErrBack');
    if(errorsMessageBack){
      errorsMessageBack.innerHTML = ""
    }

    const inputPassword1 = document.getElementById("passwd");
    const inputPassword2 = document.getElementById("confirmPsw");
    const errorsMessage = document.querySelector(`.confirmPswErrors`);

    if (inputPassword2.value == "") {
      errorsMessage.innerHTML = "Este campo no puede estar vacío."

      inputPassword2.classList.remove("is-valid");
      inputPassword2.classList.add("is-invalid");
      inputPassword2.classList.remove("is-valid-icon");
      inputPassword2.classList.add("is-invalid-icon");

      campos["confirmPsw"] = false;
    } else if (inputPassword1.value !== inputPassword2.value) {
      errorsMessage.innerHTML = "Las contraseñas no coinciden."

      inputPassword2.classList.remove("is-valid");
      inputPassword2.classList.add("is-invalid");
      inputPassword2.classList.remove("is-valid-icon");
      inputPassword2.classList.add("is-invalid-icon");

      campos["confirmPsw"] = false;
    } else {
      errorsMessage.innerHTML = ""

      inputPassword2.classList.remove("is-invalid");
      inputPassword2.classList.add("is-valid");
      inputPassword2.classList.remove("is-invalid-icon");
      inputPassword2.classList.add("is-valid-icon");
      campos["confirmPsw"] = true;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("blur", validarFormulario);
    input.addEventListener("keyup", validarFormulario);
  });

  formulario.addEventListener("submit", (e) => {
    if (campos.fname && campos.lname && campos.email && campos.passwd && campos.confirmPsw) {
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
