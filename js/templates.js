function renderPokemonCardTemplate(pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray, labels) {
  return /*html*/ `
      <div class="container">
          <div onclick="showPokemonDetails(${pokemonDataArray.id})" class="card ${pokemonDataArray.types[0].type.name}_card_before">
              <div class="info">
                  <div class="infoLeft">
                      <h1 class="name">${pokemonNamesTextArray}</h1>
                  </div>
                  <div class="infoRight">
                      <div class="battlePoints">${pokemonDataArray.stats[0].base_stat} HP</div>
                      <div class="number">${pokemonDataArray.id}</div>
                  </div>
              </div>
              <div class="window ${pokemonDataArray.types[0].type.name}_window_bg"></div>
              <div class="basicData">
                  ${pokemonGeneraTextArray} 
                  ${labels.size}: ${(pokemonDataArray.height / 10).toFixed(2)}m 
                  ${labels.weight}: ${(pokemonDataArray.weight / 10).toFixed(2)}kg
              </div>
              <p class="description">
                  ${pokemonFlavorTextArray.replaceAll("\f", "\n")}
              </p>
              <div class="types">
                  ${pokemonDataArray.types[0] ? `<img src="./assets/img/types/${pokemonDataArray.types[0].type.name}.png" alt="" />` : ""}
                  ${pokemonDataArray.types[1] ? `<img src="./assets/img/types/${pokemonDataArray.types[1].type.name}.png" alt="" />` : ""}
              </div>
              <p class="footerLine">${labels.description}</p>
          </div>
          <img onclick="showPokemonDetails(${pokemonDataArray.id})" class="pokemon" src="${pokemonDataArray.sprites.other.home.front_default}" />
      </div>
    `;
}

function renderPokemonBigCardTemplate(pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray, IndexPokeID, labels) {
  return /*html*/ `
    <div class="containerBigCard">
        <div id="pokeArrowLeftBigCard" class="pokeArrowLeftBigCard">
            <img onclick="renderPokemonDetails(${IndexPokeID - 1})" class="pokeArrowLeft" src="./assets/icons/arrowLeft.png" alt="" />
            <img onclick="renderPokemonDetails(${IndexPokeID - 1})" class="pokeArrowLeftBall" src="./assets/icons/pokeballArrow.png" alt="" />
        </div>
        <div class="infoBox ${pokemonDataArray.types[0].type.name}_card_before">
            <div class="info">
                <div class="infoLeft">
                    <h1 class="name">${pokemonNamesTextArray}</h1>
                </div>
                <div class="infoRight">
                    <div class="battlePoints">${pokemonDataArray.stats[0].base_stat} HP</div>
                    <div class="number">${pokemonDataArray.id}</div>
                </div>
            </div>
            <div class="window ${pokemonDataArray.types[0].type.name}_window_bg">
                <img class="pokemon" src="${pokemonDataArray.sprites.other.home.front_default}" />
            </div>
            <div class="basicData">
                ${pokemonGeneraTextArray} 
                ${labels.size}: ${(pokemonDataArray.height / 10).toFixed(2)}m 
                ${labels.weight}: ${(pokemonDataArray.weight / 10).toFixed(2)}kg
            </div>
            <p class="description">
                ${pokemonFlavorTextArray.replaceAll("\f", "\n")}
            </p>
            <div class="types">
                ${pokemonDataArray.types[0] ? `<img src="./assets/img/types/${pokemonDataArray.types[0].type.name}.png" alt="" />` : ""}
                ${pokemonDataArray.types[1] ? `<img src="./assets/img/types/${pokemonDataArray.types[1].type.name}.png" alt="" />` : ""}
            </div>
            <p class="footerLine">${labels.description}</p>
        </div>
        <div id="pokeArrowRightBigCard" class="pokeArrowRightBigCard">
            <img onclick="renderPokemonDetails(${IndexPokeID + 1})" class="pokeArrowRight" src="./assets/icons/ArrowRight.png" alt="" />
            <img onclick="renderPokemonDetails(${IndexPokeID + 1})" class="pokeArrowRightBall" src="./assets/icons/pokeballArrow.png" alt="" />
        </div>
    </div>
    `;
}
