window.addEventListener("load", () => {
  // Input real
  let inputFile = document.getElementById("file");

  // Previsualizacion
  let showImage = document.getElementById("view-new-upload-img");

  // Abre el visualizador de imagenes
  showImage.addEventListener("click", () => {
    if (inputFile) {
      inputFile.click();
    }
  });

  // Escucha cuando una imagen se cambia
  inputFile.addEventListener("change", () => {
    if (inputFile) {
      let reader = new FileReader();

      reader.onload = function () {
        showImage.src = reader.result;
      };

      if (inputFile && inputFile.files && inputFile.files.length) {
        reader.readAsDataURL(inputFile.files[0]);
      }
    }
  });
});
