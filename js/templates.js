function renderPokemonCardTemplate(pokemonDataArray, PokemonFlavorTextArray, PokemonGeneraTextArray, PokemonNamesTextArray) {
  return /*html*/ `
    <div class="container">
        <div class="card ${pokemonDataArray.types[0].type.name}_card_before">
            <div class="info">
                <div class="infoLeft">
                    <h6 class="pokemonInfo">Basis-Pokémon</h6>
                    <h1 class="name">${PokemonNamesTextArray}</h1>
                </div>
                <div class="infoRight">
                    <div class="battlePoints">40KP</div>
                    <div class="number">${pokemonDataArray.id}</div>
                </div>
            </div>
            <div class="window ${pokemonDataArray.types[0].type.name}_window_bg"></div>
            <div class="basicData">${PokemonGeneraTextArray} Größe: 0,7m Gewicht: 18,5 kg</div>
            <p class="description">
                ${PokemonFlavorTextArray.replaceAll("\f", "\n")}
            </p>
            <div class="types">
                ${pokemonDataArray.types[0] ? `<img src="./assets/img/types/${pokemonDataArray.types[0].type.name}.png" alt="" />` : ""}
                ${pokemonDataArray.types[1] ? `<img src="./assets/img/types/${pokemonDataArray.types[1].type.name}.png" alt="" />` : ""}
            </div>
            <p class="footerLine">Ein großer Dank an Ditto für die hervorragende Modellarbeit.</p>
        </div>
        <img class="pokemon" src="${pokemonDataArray.sprites.other.home.front_default}" />
    </div>
`;
}
