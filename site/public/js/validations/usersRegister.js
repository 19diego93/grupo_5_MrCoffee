window.addEventListener("load", function () {
  let form = document.querySelector(".form-register");

  form.addEventListener("submit", function (e) {
    let errores = [];

    if (form.fname.value == "") {
      let first_name = "el campo de nombre no puede estar vacio";
      errores.push(first_name);
    }

    if (form.lname.value == "") {
      let last_name = "el campo del apellido no puede estar vacio";
      errores.push(last_name);
    }

    if (errores.length > 0) {
      e.preventDefault();
      console.log(errores);
      console.log("no envio crack");
    }
  });
});
