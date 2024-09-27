import { P, pokemonDataCache, pokemonLimit, currentLanguage } from "./globals.js";

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
    flavorTextArray.push(pokeFlavorText);
  }
  return flavorTextArray;
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
    generaTextArray.push(pokeGenera);
  }
  return generaTextArray;
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

export function selectedPokemonLimit(selectedPokemonStart, selectedPokemonEnd, selectedPokemonLimit) {
  overwritePokemonLimit(selectedPokemonLimit);
  overwritePokemonStart(selectedPokemonStart);
  overwritePokemonEnd(selectedPokemonEnd);
  loadAndRenderPokemonCards();
}
