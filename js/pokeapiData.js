/**
 * @fileoverview This module handles the retrieval of Pokémon data from the Pokémon API.
 * It imports necessary constants and fallback texts to fetch and cache Pokémon data,
 * including species information and custom flavor texts.
 */

/**
 * Importing various constants from the globals.js module.
 *
 * @module globals
 * @property {Object} P - Instance of Pokedex with custom options.
 * @property {Array} pokemonDataCache - Cache for Pokémon data.
 * @property {number} pokemonLimit - Limit for the number of Pokémon.
 * @property {string} currentLanguage - Current language setting.
 */
import { P, pokemonDataCache, pokemonLimit, currentLanguage } from "./globals.js";

/**
 * Importing various custom fallback texts from the cardsFallbackText.js module.
 *
 * @module cardsFallbackText
 * @property {string} customFlavorTextGer - Custom flavor text in German.
 * @property {string} customFlavorTextJa - Custom flavor text in Japanese.
 * @property {string} customGeneraTextGer - Custom genera text in German.
 * @property {string} customGeneraTextJa - Custom genera text in Japanese.
 */
import { customFlavorTextGer, customFlavorTextJa, customGeneraTextGer, customGeneraTextJa } from "./cardsFallbackText.js";

/**
 * Preloads Pokémon API data and caches it.
 *
 * This function fetches data for each Pokémon up to the specified limit and stores it in a cache.
 * It retrieves the Pokémon data, species data, and additional Pokémon information concurrently.
 *
 * @async
 * @function preLoadPokemonAPIData
 * @returns {Promise<void>} A promise that resolves when all Pokémon data has been preloaded and cached.
 *
 * @example
 * preLoadPokemonAPIData().then(() => {
 *   console.log('All Pokémon data has been preloaded.');
 * });
 */
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

/**
 * Fetches and returns an array of Pokémon data.
 *
 * This function iterates through a range of Pokémon IDs and retrieves the corresponding
 * data from the `pokemonDataCache` array. The data for each Pokémon is then pushed into
 * the `pokemonDataArray`, which is returned at the end.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of Pokémon data.
 */
export async function getPokemonData() {
  const pokemonDataArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    pokemonDataArray.push(pokemonDataCache[IndexPokeID].data);
  }
  return pokemonDataArray;
}

/**
 * Fetches the flavor text for each Pokémon up to the specified limit.
 *
 * This function iterates through the Pokémon data cache and retrieves the flavor text
 * for each Pokémon in the specified language. If the flavor text is not available in the
 * specified language, it falls back to a default flavor text.
 *
 * @async
 * @function getPokemonFlavorText
 * @returns {Promise<string[]>} A promise that resolves to an array of flavor texts for each Pokémon.
 */
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

/**
 * Retrieves the fallback flavor text for a given Pokémon ID based on the current language.
 *
 * @param {number} IndexPokeID - The index of the Pokémon ID for which the flavor text is needed.
 * @returns {string} The fallback flavor text in the current language, or an empty string if not available.
 */
function getFallbackFlavorText(IndexPokeID) {
  if (currentLanguage === "de") return customFlavorTextGer[IndexPokeID] || "";
  if (currentLanguage === "ja") return customFlavorTextJa[IndexPokeID] || "";
  return "";
}

/**
 * Fetches the genera text for each Pokémon within the specified limit.
 *
 * This function iterates through Pokémon IDs from 1 to `pokemonLimit - 1`, retrieves the species data from the cache,
 * and extracts the genera text for the current language. If the genera text is not available in the specified language,
 * it falls back to a default genera text.
 *
 * @async
 * @function getPokemonGeneraText
 * @returns {Promise<string[]>} A promise that resolves to an array of genera text strings for each Pokémon.
 */
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

/**
 * Retrieves the fallback genera text for a given Pokémon ID based on the current language.
 *
 * @param {number} IndexPokeID - The index of the Pokémon ID.
 * @returns {string} The fallback genera text in the current language, or an empty string if not available.
 */
function getFallbackGeneraText(IndexPokeID) {
  if (currentLanguage === "de") return customGeneraTextGer[IndexPokeID] || "";
  if (currentLanguage === "ja") return customGeneraTextJa[IndexPokeID] || "";
  return "";
}

/**
 * Fetches the names of Pokémon in the specified language and returns them as an array of strings.
 *
 * @async
 * @function getPokemonNamesText
 * @returns {Promise<string[]>} An array of Pokémon names in the specified language.
 */
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
