window.addEventListener("load", function () {
  //   let form = document.querySelector(".form-register");

  //   form.addEventListener("submit", function (e) {
  //     let errores = [];

  //     if (form.fname.value == "") {
  //       let first_name = "el campo de nombre no puede estar vacio";
  //       errores.push(first_name);
  //     }

  //     if (form.lname.value == "") {
  //       let last_name = "el campo del apellido no puede estar vacio";
  //       errores.push(last_name);
  //     }

  //     if (errores.length > 0) {
  //       e.preventDefault();
  //       console.log(errores);
  //       console.log("no envio crack");
  //     }
  //   });

  const formulario = document.getElementById("formulario");
  const inputs = document.querySelectorAll("#formulario input");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    correo:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // correo valido
    password: /^.{8,65}$/, // 4 a 12 digitos.
  };

  const campos = {
    first_name: true,
    last_name: true,
    email: true,
    newPassword: true,
    confirmNewPassword: true,
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
      case "newPassword":
        validationPassword(expresiones.password, e.target, "newPassword");
        validationPassword_2();
        break;
      case "confirmNewPassword":
        validationPassword_2();
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

  const validationPassword = (expresion, input, campo) => {
    // const inputPassword1 = document.getElementById("oldPassword");
    const inputPassword = document.getElementById("psw");

    const errorsMessage = document.querySelectorAll(`.${campo}Errors`);
    const inputColor = document.getElementById(`${campo}`);

    if (input.value.length === 0) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      if (campo === "psw") {
        inputColor.classList.remove("is-invalid");
        inputColor.classList.add("is-valid");
        campos[campo] = true;
      } else {
        inputColor.classList.remove("is-valid");
        inputColor.classList.add("is-invalid");

        document.querySelector(`.${campo}Vacio`).classList.add("displayBlock");
        campos[campo] = false;
      }
    } else if (
      inputPassword.value.length > 0 &&
      inputPassword1.value.length === 0
    ) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document
        .querySelector(`.newPasswordPass`)
        .classList.remove("displayNone");
      document.querySelector(`.newPasswordPass`).classList.add("displayBlock");

      inputPassword1.classList.remove("is-valid");
      inputPassword1.classList.add("is-invalid");
      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
    } else if (input.value.length > 0 && input.value.length < 8) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Min`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      campos[campo] = false;
    } else if (input.value.length > 65) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document.querySelector(`.${campo}Max`).classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      campos[campo] = false;
    } else if (!expresion.test(input.value)) {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      document
        .querySelector(`.${campo}Caracters`)
        .classList.add("displayBlock");

      inputColor.classList.remove("is-valid");
      inputColor.classList.add("is-invalid");
      campos[campo] = false;
    } else {
      errorsMessage.forEach((error) => {
        error.classList.remove("displayBlock");
        error.classList.add("displayNone");
      });

      inputColor.classList.remove("is-invalid");
      inputColor.classList.add("is-valid");
      campos[campo] = true;
    }
  };

  const validationPassword_2 = () => {
    const inputPassword1 = document.getElementById("newPassword");
    const inputPassword = document.getElementById("confirmNewPassword");

    if (inputPassword1.value !== inputPassword.value) {
      inputPassword.classList.remove("is-valid");
      inputPassword.classList.add("is-invalid");
      campos["confirmNewPassword"] = false;

      document
        .querySelector(".confirmNewPasswordEq")
        .classList.remove("displayNone");
      document
        .querySelector(".confirmNewPasswordEq")
        .classList.add("displayBlock");
    } else {
      inputPassword.classList.remove("is-invalid");
      inputPassword.classList.add("is-valid");
      campos["confirmNewPassword"] = true;

      document
        .querySelector(".confirmNewPasswordEq")
        .classList.remove("displayBlock");
      document
        .querySelector(".confirmNewPasswordEq")
        .classList.add("displayNone");
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
      campos.newPassword &&
      campos.confirmNewPassword
    ) {
      e.submit();
    } else if (
      campos.first_name &&
      campos.last_name &&
      campos.email &&
      campos.newPassword &&
      campos.confirmNewPassword
    ) {
      e.preventDefault();

      MessageAlert.classList.remove("displayBlock");
      MessageAlert.classList.add("displayNone");

      MessageError.classList.remove("displayNone");
      MessageError.classList.add("displayBlock");
    } else {
      e.preventDefault();

      MessageAlert.classList.remove("displayBlock");
      MessageAlert.classList.add("displayNone");

      MessageError.classList.remove("displayNone");
      MessageError.classList.add("displayBlock");
    }
  });
});
