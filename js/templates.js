function renderPokemonCardTemplate(pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray) {
  return /*html*/ `
    <div class="container">
        <div class="card ${pokemonDataArray.types[0].type.name}_card_before">
            <div class="info">
                <div class="infoLeft">
                    <h1 class="name">${pokemonNamesTextArray}</h1>
                </div>
                <div class="infoRight">
                    <div class="battlePoints">${pokemonDataArray.stats[0].base_stat} HP</div> <!-- -->
                    <div class="number">${pokemonDataArray.id}</div>
                </div>
            </div>
            <div class="window ${pokemonDataArray.types[0].type.name}_window_bg"></div>
            <div class="basicData">
                ${pokemonGeneraTextArray} 
                Größe: ${(pokemonDataArray.height / 10).toFixed(2)}m 
                Gewicht: ${(pokemonDataArray.weight / 10).toFixed(2)}kg
            </div>
            <p class="description">
                ${pokemonFlavorTextArray.replaceAll("\f", "\n")}
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
