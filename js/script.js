const P = new Pokedex.Pokedex();
let pokemonStart = 1; // 1
let pokemonLimit = 11; // 1026
let currentLanguage = "en";

async function renderPokemonCards() {
  const contentRef = document.getElementById("content");
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  const pokemonStatArray = await getPokemonStats();
  for (let index = pokemonStart; index < pokemonLimit; index++) {
    contentRef.innerHTML += renderPokemonCardTemplate(
      pokemonDataArray[index - pokemonStart],
      pokemonFlavorTextArray[index - pokemonStart],
      pokemonGeneraTextArray[index - pokemonStart],
      pokemonNamesTextArray[index - pokemonStart],
      pokemonStatArray
    );
  }
}
renderPokemonCards();

async function getPokemonData() {
  const pokemonData = [];
  for (let index = pokemonStart; index < pokemonLimit; index++) {
    pokemonData.push(P.getPokemonByName(index));
  }
  return Promise.all(pokemonData);
}

//! FlavorText
async function findCurrentFlavorTextIndex() {
  let currentIndex = [];
  for (let indexPokemonLimit = pokemonStart; indexPokemonLimit < pokemonLimit; indexPokemonLimit++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonLimit);
    for (let indexFlavorText = 0; indexFlavorText < response.flavor_text_entries.length; indexFlavorText++) {
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
  for (let index = pokemonStart; index < pokemonLimit; index++) {
    PokemonFlavorText.push(
      P.getPokemonSpeciesByName(index).then((response) => {
        const selectedEntry = response.flavor_text_entries[flavorTextLanguage[index - pokemonStart]];
        if (selectedEntry && selectedEntry.flavor_text) {
          return selectedEntry.flavor_text;
        } else {
          console.log("flavor_text", index);
          return "";
        }
      })
    );
  }
  return Promise.all(PokemonFlavorText);
}

//! GeneraText
async function findCurrentGeneraTextIndex() {
  let generaCurrentIndex = [];
  for (let indexPokemonLimit = pokemonStart; indexPokemonLimit < pokemonLimit; indexPokemonLimit++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonLimit);
    for (let indexGeneraText = 0; indexGeneraText < response.genera.length; indexGeneraText++) {
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
  for (let index = pokemonStart; index < pokemonLimit; index++) {
    PokemonGeneraText.push(
      P.getPokemonSpeciesByName(index).then((response) => {
        const genusEntry = response.genera[GeneraTextLanguage[index - pokemonStart]];
        if (genusEntry && genusEntry.genus) {
          return genusEntry.genus;
        } else {
          console.log("genus", index);
          return "";
        }
      })
    );
  }
  return Promise.all(PokemonGeneraText);
}

//! PokemonNames
async function findCurrentNamesTextIndex() {
  let NamesCurrentIndex = [];
  for (let indexPokemonLimit = pokemonStart; indexPokemonLimit < pokemonLimit; indexPokemonLimit++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonLimit);
    for (let indexNamesText = 0; indexNamesText < response.names.length; indexNamesText++) {
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
  for (let index = pokemonStart; index < pokemonLimit; index++) {
    PokemonNamesText.push(
      P.getPokemonSpeciesByName(index).then((response) => {
        const nameEntry = response.names[NamesTextLanguage[index - pokemonStart]];
        if (nameEntry && nameEntry.name) {
          return nameEntry.name;
        } else {
          console.log("name", index);
          return "";
        }
      })
    );
  }

  return Promise.all(PokemonNamesText);
}

//! PokemonStats
async function getPokemonStats() {
  const pokemonStatsCurrentIndex = {
    hp: [],
    attack: [],
    defense: [],
    "special-attack": [],
    "special-defense": [],
    speed: [],
  };
  for (let indexPokemonLimit = pokemonStart; indexPokemonLimit < pokemonLimit; indexPokemonLimit++) {
    const response = await P.getPokemonByName(indexPokemonLimit);
    for (let indexPokemonStats = 0; indexPokemonStats < response.stats.length; indexPokemonStats++) {
      const statName = response.stats[indexPokemonStats].stat.name;
      if (pokemonStatsCurrentIndex.hasOwnProperty(statName)) {
        pokemonStatsCurrentIndex[statName].push(indexPokemonStats);
      }
    }
  }
  return pokemonStatsCurrentIndex;
}
