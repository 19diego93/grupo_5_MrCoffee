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
      special: new RegExp("(?=.*[@#$%^&*])"),
      specialError: new RegExp("(?=.*[!-])"),
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
        validation_2(expresiones.password, e.target.value, "passwd", 8, 65);
        validation_3();
        break;
      case "confirmPsw":
        validation_3();
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

  function validation_2(expresion, value, campo, min, max) {
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
    } else if (!expresion.lower.test(value)) {
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

      document.querySelector(`.${campo}Special`).classList.add("displayBlock");
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

  const validation_3 = () => {
    const inputPassword1 = document.getElementById("passwd");
    const inputPassword2 = document.getElementById("confirmPsw");

    const errorsMessage = document.querySelectorAll(`.confirmPswErrors`);

    if (inputPassword2.value == "") {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      inputPassword2.classList.remove("is-valid");
      inputPassword2.classList.add("is-invalid");
      inputPassword2.classList.remove("is-valid-icon");
      inputPassword2.classList.add("is-invalid-icon");
      campos["confirmPsw"] = false;

      document
        .querySelector(".confirmPswVacio")
        .classList.remove("displayNone");
      document.querySelector(".confirmPswVacio").classList.add("displayBlock");
    } else if (inputPassword1.value !== inputPassword2.value) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      inputPassword2.classList.remove("is-valid");
      inputPassword2.classList.add("is-invalid");
      inputPassword2.classList.remove("is-valid-icon");
      inputPassword2.classList.add("is-invalid-icon");
      campos["confirmPsw"] = false;

      document.querySelector(".confirmPswEq").classList.remove("displayNone");
      document.querySelector(".confirmPswEq").classList.add("displayBlock");
    } else {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

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
