const P = new Pokedex.Pokedex();
const debouncedForward = debounce(forward, 1000);
const debouncedBackward = debounce(backward, 1000);
let pokemonStart = 1; // Start
let pokemonEnd = 11; // Ende
let pokemonLimit = 11; // Max 152
let currentLanguage = "en";

async function preLoadPokemonAPIData() {
  const promises = [];
  for (let index = pokemonStart; index < pokemonLimit; index++) {
    promises.push(P.getPokemonByName(index));
    promises.push(P.getPokemonSpeciesByName(index));
  }
  await Promise.all(promises);
}

preLoadPokemonAPIData();

// https://dev.to/jeetvora331/javascript-debounce-easiest-explanation--29hc
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function forward() {
  if (pokemonEnd >= pokemonLimit) {
    pokemonStart = 1;
    pokemonEnd = 11;
  } else if (pokemonEnd + 10 > pokemonLimit) {
    pokemonStart += 10;
    pokemonEnd = pokemonLimit;
  } else {
    pokemonStart += 10;
    pokemonEnd += 10;
  }
  renderPokemonCards();
}

function backward() {
  if (pokemonStart <= 1) {
    pokemonStart = Math.floor(pokemonLimit / 10) * 10 + 1;
    pokemonEnd = pokemonLimit;
  } else if (pokemonStart - 10 < 1) {
    pokemonEnd = pokemonStart - 1;
    pokemonStart = 1;
  } else {
    pokemonStart -= 10;
    if (pokemonEnd === pokemonLimit) {
      pokemonEnd = pokemonStart + 10;
    } else {
      pokemonEnd -= 10;
    }
  }
  renderPokemonCards();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    debouncedForward();
  } else if (event.key === "ArrowLeft") {
    debouncedBackward();
  }
});

async function renderPokemonCards() {
  const contentRef = document.getElementById("content");
  contentRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  const pokemonStatArray = await getPokemonStats();
  for (let index = pokemonStart; index < pokemonEnd; index++) {
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
  for (let index = pokemonStart; index < pokemonEnd; index++) {
    pokemonData.push(P.getPokemonByName(index));
  }
  // preLoadPokemonStart();
  // preLoadPokemonBack();
  return Promise.all(pokemonData);
}

//! FlavorText
async function findCurrentFlavorTextIndex() {
  let currentIndex = [];
  for (let indexPokemonEnd = pokemonStart; indexPokemonEnd < pokemonEnd; indexPokemonEnd++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonEnd);
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
  for (let index = pokemonStart; index < pokemonEnd; index++) {
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
  for (let indexPokemonEnd = pokemonStart; indexPokemonEnd < pokemonEnd; indexPokemonEnd++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonEnd);
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
  for (let index = pokemonStart; index < pokemonEnd; index++) {
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
  for (let indexPokemonEnd = pokemonStart; indexPokemonEnd < pokemonEnd; indexPokemonEnd++) {
    const response = await P.getPokemonSpeciesByName(indexPokemonEnd);
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
  for (let index = pokemonStart; index < pokemonEnd; index++) {
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
  for (let indexPokemonEnd = pokemonStart; indexPokemonEnd < pokemonEnd; indexPokemonEnd++) {
    const response = await P.getPokemonByName(indexPokemonEnd);
    for (let indexPokemonStats = 0; indexPokemonStats < response.stats.length; indexPokemonStats++) {
      const statName = response.stats[indexPokemonStats].stat.name;
      if (pokemonStatsCurrentIndex.hasOwnProperty(statName)) {
        pokemonStatsCurrentIndex[statName].push(indexPokemonStats);
      }
    }
  }
  return pokemonStatsCurrentIndex;
}
