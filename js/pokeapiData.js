import { P, pokemonDataCache, pokemonLimit, currentLanguage, RegionsMenuOpen, contentRef } from "./globals.js";
import { customFlavorTextGer, customFlavorTextJa, customGeneraTextGer, customGeneraTextJa } from "./cardsFallbackText.js";

export async function preLoadPokemonAPIData() {
  const promises = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
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
  await Promise.all(promises); // https://www.w3schools.com/jsref/jsref_promise_all.asp
}

export async function getPokemonData() {
  const pokemonDataArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    pokemonDataArray.push(pokemonDataCache[IndexPokeID].data);
  }
  return pokemonDataArray;
}

export async function getPokemonFlavorText() {
  const flavorTextArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeFlavorText = "";
    for (let indexFlavorText = 0; indexFlavorText < speciesData.flavor_text_entries.length; indexFlavorText++) {
      if (speciesData.flavor_text_entries[indexFlavorText].language.name === currentLanguage) {
        pokeFlavorText = speciesData.flavor_text_entries[indexFlavorText].flavor_text;
        break;
      }
    }
    if (!pokeFlavorText) pokeFlavorText = getFallbackFlavorText(IndexPokeID);
    flavorTextArray.push(pokeFlavorText);
  }
  return flavorTextArray;
}

function getFallbackFlavorText(IndexPokeID) {
  if (currentLanguage === "de") return customFlavorTextGer[IndexPokeID] || "";
  if (currentLanguage === "ja") return customFlavorTextJa[IndexPokeID] || "";
  return "";
}

export async function getPokemonGeneraText() {
  const generaTextArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeGenera = "";
    for (let indexGenera = 0; indexGenera < speciesData.genera.length; indexGenera++) {
      if (speciesData.genera[indexGenera].language.name === currentLanguage) {
        pokeGenera = speciesData.genera[indexGenera].genus;
        break;
      }
    }
    if (!pokeGenera) pokeGenera = getFallbackGeneraText(IndexPokeID);
    generaTextArray.push(pokeGenera);
  }
  return generaTextArray;
}

function getFallbackGeneraText(IndexPokeID) {
  if (currentLanguage === "de") return customGeneraTextGer[IndexPokeID] || "";
  if (currentLanguage === "ja") return customGeneraTextJa[IndexPokeID] || "";
  return "";
}

export async function getPokemonNamesText() {
  const namesTextArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
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

export function toggleRegionsMenu() {
  const selectedPokemonRegionsRef = document.getElementById("selectedPokemonRegions");
  if (!RegionsMenuOpen) selectedPokemonRegionsRef.classList.toggle("d_none");
  setTimeout(() => {
    selectedPokemonRegionsRef.classList.toggle("transformIn");
    if (!RegionsMenuOpen) {
      setTimeout(() => {
        selectedPokemonRegionsRef.classList.toggle("d_none");
      }, 1000);
    }
  }, 10);
  overwriteRegionsMenuOpen(!RegionsMenuOpen);
}

export function selectedPokemonLimit(selectedPokemonStart, selectedPokemonEnd, selectedPokemonLimit) {
  overwritePokemonLimit(selectedPokemonLimit);
  overwritePokemonStart(selectedPokemonStart);
  overwritePokemonEnd(selectedPokemonEnd);
  toggleRegionsMenu();
  setTimeout(() => {
    loadAndRenderPokemonCards();
  }, 1000);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && RegionsMenuOpen) toggleRegionsMenu();
});

contentRef.addEventListener("click", function (event) {
  if (event.target === contentRef && RegionsMenuOpen) toggleRegionsMenu();
});
