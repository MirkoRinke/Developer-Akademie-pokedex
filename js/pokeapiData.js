import { P, pokemonDataCache, pokemonLimit, currentLanguage } from "./globals.js";
import { customFlavorTextGer, customFlavorTextJa, customGeneraTextGer, customGeneraTextJa } from "./cardsFallbackText.js";

export async function preLoadPokemonAPIData() {
  const promises = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const pokemonData = P.getPokemonByName(IndexPokeID);
    const pokemonSpecies = P.getPokemonSpeciesByName(IndexPokeID);
    const pokemon = P.getPokemon(IndexPokeID);
    promises.push(
      Promise.all([pokemonData, pokemonSpecies, pokemon]).then(([data, species, pokemon]) => {
        pokemonDataCache[IndexPokeID] = {
          data,
          species,
          pokemon,
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
    const flavorTextEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === currentLanguage);
    const pokeFlavorText = flavorTextEntry ? flavorTextEntry.flavor_text : getFallbackFlavorText(IndexPokeID);
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
    const generaEntry = speciesData.genera.find((entry) => entry.language.name === currentLanguage);
    const pokeGenera = generaEntry ? generaEntry.genus : getFallbackGeneraText(IndexPokeID);
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
    const nameEntry = speciesData.names.find((entry) => entry.language.name === currentLanguage);
    const pokeName = nameEntry ? nameEntry.name : "";
    namesTextArray.push(pokeName);
  }
  return namesTextArray;
}
