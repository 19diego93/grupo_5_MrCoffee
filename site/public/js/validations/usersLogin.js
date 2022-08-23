window.addEventListener("load", function () {
  // ? el opcional de verificar si existe faltaria

  let form = document.querySelector(".form-login");
  let errorEmail = document.querySelector(".errorEmail");
  let errorNoEmail = document.querySelector(".errorNoEmail");
  let errorPass = document.querySelector(".errorPass");

  form.addEventListener("submit", function (e) {
    let errores = [];

    if (
      !/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/.test(
        form.email.value
      )
    ) {
      errores.push("no es un email valido");
    }

    if (form.email.value == "") {
      let email = "el campo Email no puede estar vacio";
      errores.push(email);
    }

    if (form.password.value == "") {
      let psw = "el campo Contraseña no puede estar vacio";
      errores.push(psw);
    }

    // !variables errores
    let idexFormat = errores.indexOf("no es un email valido");
    let idexEmail = errores.indexOf("el campo Email no puede estar vacio");
    let idexPss = errores.indexOf("el campo Contraseña no puede estar vacio");

    if (errores.length > 0) {
      e.preventDefault();
      if (idexFormat > -1) {
        console.log(idexFormat);
        errorNoEmail.style.display = "block";
        errorNoEmail.innerText = errores[idexFormat];
      } else {
        errorNoEmail.style.display = "none";
      }
      if (idexEmail > -1) {
        errorEmail.style.display = "block";
        errorNoEmail.style.display = "none";
        errorEmail.innerText = errores[idexEmail];
      } else {
        errorEmail.style.display = "none";
      }
      if (idexPss > -1) {
        errorPass.style.display = "block";
        errorPass.innerText = errores[idexPss];
      } else {
        errorPass.style.display = "none";
      }
    }
  });
});
