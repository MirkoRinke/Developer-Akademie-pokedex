const P = new Pokedex.Pokedex();
const debouncedForward = debounce(forward, 1000);
const debouncedBackward = debounce(backward, 1000);
const contentBigCardRef = document.getElementById("contentBigCard");
const pokeArrowLeftContainerRef = document.getElementById("pokeArrowLeftContainer");
const pokeArrowRightContainerRef = document.getElementById("pokeArrowRightContainer");
const contentBigCardContainerRef = document.getElementById("contentBigCardContainer");
const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
let pokemonDataCache = []; // Cache
let pokemonStart = 1; // Start
let pokemonEnd = 11; // Ende
let pokemonLimit = 152; // Max 152 , 1026
let currentLanguage = "en";

//! Page Buttons and EventListener
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

//!  preLoadPokemonAPIData
async function preLoadPokemonAPIData() {
  const promises = [];
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const pokemonData = P.getPokemonByName(IndexPokeID);
    const pokemonSpecies = P.getPokemonSpeciesByName(IndexPokeID);
    promises.push(
      Promise.all([pokemonData, pokemonSpecies]).then(([data, species]) => {
        pokemonDataCache[IndexPokeID] = {
          data,
          species,
        };
      })
    );
  }
  await Promise.all(promises);
}

//! render PokemonCards after preLoad
async function loadAndRenderPokemonCards() {
  await preLoadPokemonAPIData();
  renderPokemonCards();
}
loadAndRenderPokemonCards();

//! Get Pokemon Data
async function getPokemonData() {
  const pokemonDataArray = [];
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonLimit; IndexPokeID++) {
    pokemonDataArray.push(pokemonDataCache[IndexPokeID].data);
  }
  return pokemonDataArray;
}

//! render Pokemon Cards
async function renderPokemonCards() {
  const contentRef = document.getElementById("contentCards");
  contentRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonEnd; IndexPokeID++) {
    contentRef.innerHTML += renderPokemonCardTemplate(
      pokemonDataArray[IndexPokeID - pokemonStart],
      pokemonFlavorTextArray[IndexPokeID - pokemonStart],
      pokemonGeneraTextArray[IndexPokeID - pokemonStart],
      pokemonNamesTextArray[IndexPokeID - pokemonStart]
    );
  }
}

//! FlavorText
async function getPokemonFlavorText() {
  const flavorTextArray = [];
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeFlavorText = "";
    for (let indexFlavorText = 0; indexFlavorText < speciesData.flavor_text_entries.length; indexFlavorText++) {
      if (speciesData.flavor_text_entries[indexFlavorText].language.name === currentLanguage) {
        pokeFlavorText = speciesData.flavor_text_entries[indexFlavorText].flavor_text;
        break;
      }
    }
    flavorTextArray.push(pokeFlavorText);
  }
  return flavorTextArray;
}

//! GeneraText
async function getPokemonGeneraText() {
  const generaTextArray = [];
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeGenera = "";
    for (let indexGenera = 0; indexGenera < speciesData.genera.length; indexGenera++) {
      if (speciesData.genera[indexGenera].language.name === currentLanguage) {
        pokeGenera = speciesData.genera[indexGenera].genus;
        break;
      }
    }
    generaTextArray.push(pokeGenera);
  }
  return generaTextArray;
}

//! PokemonNames
async function getPokemonNamesText() {
  const namesTextArray = [];
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeName = "";
    for (let indexNames = 0; indexNames < speciesData.names.length; indexNames++) {
      if (speciesData.names[indexNames].language.name === currentLanguage) {
        pokeName = speciesData.names[indexNames].name;
        break;
      }
    }
    namesTextArray.push(pokeName);
  }
  return namesTextArray;
}

//! Pokemon Details Big Card
function showPokemonDetails(IndexPokeID) {
  contentBigCardRef.classList.toggle("d_none");
  pokeArrowLeftContainerRef.classList.toggle("d_none");
  pokeArrowRightContainerRef.classList.toggle("d_none");
  renderPokemonDetails(IndexPokeID);
}

contentBigCardRef.addEventListener("click", function (event) {
  if (event.target == contentBigCardRef) {
    contentBigCardRef.classList.toggle("d_none");
    pokeArrowLeftContainerRef.classList.toggle("d_none");
    pokeArrowRightContainerRef.classList.toggle("d_none");
  }
});

async function renderPokemonDetails(IndexPokeID) {
  if (IndexPokeID < pokemonStart) IndexPokeID = pokemonLimit - 1;
  if (IndexPokeID >= pokemonLimit) IndexPokeID = pokemonStart;
  contentBigCardRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  contentBigCardRef.innerHTML = renderPokemonBigCardTemplate(
    pokemonDataArray[IndexPokeID - pokemonStart],
    pokemonFlavorTextArray[IndexPokeID - pokemonStart],
    pokemonGeneraTextArray[IndexPokeID - pokemonStart],
    pokemonNamesTextArray[IndexPokeID - pokemonStart],
    IndexPokeID
  );
}

//! Pokemon Search Input
function pokemonSearchInput() {
  if (pokemonSearchInputRef.value.length >= 3) {
    searchPokemonByName(pokemonSearchInputRef.value);
  } else {
    renderPokemonCards();
  }
}

pokemonSearchInputRef.addEventListener("input", function () {
  pokemonSearchInput();
});

//! Pokemon Search Funktion "searchPokemonByName("pik")"
async function searchPokemonByName(search) {
  let selectedPokemonIDs = [];
  if (pokemonDataCache.length === 0) {
    await preLoadPokemonAPIData();
  }
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonLimit; IndexPokeID++) {
    if (pokemonDataCache[IndexPokeID]) {
      let PokeNameEng = pokemonDataCache[IndexPokeID].species.names[8].name;
      let PokeNameGer = pokemonDataCache[IndexPokeID].species.names[5].name;
      if (PokeNameEng.toLowerCase().includes(search.toLowerCase()) || PokeNameGer.toLowerCase().includes(search.toLowerCase())) {
        selectedPokemonIDs.push(IndexPokeID - 1);
      }
    }
  }
  renderSelectedPokemonCards(selectedPokemonIDs);
}

//! render Search Pokemon
async function renderSelectedPokemonCards(pokemonIDs) {
  const contentRef = document.getElementById("contentCards");
  contentRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  for (let pokeID of pokemonIDs) {
    if (pokeID >= 1) {
      contentRef.innerHTML += renderPokemonCardTemplate(
        pokemonDataArray[pokeID],
        pokemonFlavorTextArray[pokeID],
        pokemonGeneraTextArray[pokeID],
        pokemonNamesTextArray[pokeID]
      );
    }
  }
}
