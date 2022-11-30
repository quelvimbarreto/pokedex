const loader = document.querySelector(".loader");

window.onload = function () {
  setTimeout(function () {
    loader.classList.toggle("inactive");
    carregaPokemons();
  }, 3000);
};
