function carregaPokemons() {
  const pokemonList = document.getElementById("pokemonList");
  const loadMoreButton = document.getElementById("loadMoreButton");

  const maxRecords = 151;
  const limit = 9;
  let offset = 0;

  function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="pokemon_title">            
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>
            <div class="detail">
                <div class="detail_left">
                    <h3>Type:</h3>
                    <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                    </ol>
                    <h3>Abilities:</h3>
                    <ol class="abilities">
                    ${pokemon.abilities
                      .map((ability) => `<li class="ability">${ability}</li>`)
                      .join("")}
                    </ol>
                </div>
                <div class="detail_right">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </div>
        </li>
    `;
  }

  function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonList.innerHTML += newHtml;
    });
  }

  loadPokemonItens(offset, limit);

  loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      loadPokemonItens(offset, limit);
    }
  });
}
