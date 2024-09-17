const P = new Pokedex.Pokedex();
const pokemonLimit = 11;
const currentLanguage = "de";

async function renderPokemonCards() {
  const contentRef = document.getElementById("content");
  const pokemonDataArray = await getPokemonData();
  const PokemonFlavorTextArray = await getPokemonFlavorText();
  const PokemonGeneraTextArray = await getPokemonGeneraText();
  const PokemonNamesTextArray = await getPokemonNamesText();
  for (let index = 1; index < pokemonLimit; index++) {
    contentRef.innerHTML += renderPokemonCardTemplate(
      pokemonDataArray[index - 1],
      PokemonFlavorTextArray[index - 1],
      PokemonGeneraTextArray[index - 1],
      PokemonNamesTextArray[index - 1]
    );
  }
}

renderPokemonCards();

async function getPokemonData() {
  const pokemonData = [];
  for (let index = 1; index < pokemonLimit; index++) {
    pokemonData.push(P.getPokemonByName(index));
  }
  return Promise.all(pokemonData);
}

//! FlavorText
async function findCurrentFlavorTextIndex() {
  let currentIndex = [];
  for (let indexPokemonLimit = 1; indexPokemonLimit < pokemonLimit; indexPokemonLimit++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonLimit);
    for (let indexFlavorText = 1; indexFlavorText < response.flavor_text_entries.length; indexFlavorText++) {
      if (response.flavor_text_entries[indexFlavorText].language.name === currentLanguage) {
        currentIndex.push(indexFlavorText);
        break;
      }
    }
  }
  return currentIndex;
}

async function getPokemonFlavorText() {
  const flavorTextLanguage = await findCurrentFlavorTextIndex();
  const PokemonFlavorText = [];
  for (let index = 1; index < pokemonLimit; index++) {
    PokemonFlavorText.push(
      P.getPokemonSpeciesByName(index).then((response) => {
        return response.flavor_text_entries[flavorTextLanguage[index - 1]].flavor_text;
      })
    );
  }
  return Promise.all(PokemonFlavorText);
}

//! GeneraText
async function findCurrentGeneraTextIndex() {
  let generaCurrentIndex = [];
  for (let indexPokemonLimit = 1; indexPokemonLimit < pokemonLimit; indexPokemonLimit++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonLimit);
    for (let indexGeneraText = 1; indexGeneraText < response.genera.length; indexGeneraText++) {
      if (response.genera[indexGeneraText].language.name === currentLanguage) {
        generaCurrentIndex.push(indexGeneraText);
        break;
      }
    }
  }
  return generaCurrentIndex;
}

async function getPokemonGeneraText() {
  const GeneraTextLanguage = await findCurrentGeneraTextIndex();
  const PokemonGeneraText = [];
  for (let index = 1; index < pokemonLimit; index++) {
    PokemonGeneraText.push(
      P.getPokemonSpeciesByName(index).then((response) => {
        return response.genera[GeneraTextLanguage[index - 1]].genus;
      })
    );
  }
  return Promise.all(PokemonGeneraText);
}

//! PokemonNames
async function findCurrentNamesTextIndex() {
  let NamesCurrentIndex = [];
  for (let indexPokemonLimit = 1; indexPokemonLimit < pokemonLimit; indexPokemonLimit++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonLimit);
    for (let indexNamesText = 1; indexNamesText < response.names.length; indexNamesText++) {
      if (response.names[indexNamesText].language.name === currentLanguage) {
        NamesCurrentIndex.push(indexNamesText);
        break;
      }
    }
  }
  return NamesCurrentIndex;
}

async function getPokemonNamesText() {
  const NamesTextLanguage = await findCurrentNamesTextIndex();
  const PokemonNamesText = [];
  for (let index = 1; index < pokemonLimit; index++) {
    PokemonNamesText.push(
      P.getPokemonSpeciesByName(index).then((response) => {
        return response.names[NamesTextLanguage[index - 1]].name;
      })
    );
  }
  return Promise.all(PokemonNamesText);
}
