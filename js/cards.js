/**
 * @fileoverview This module handles the retrieval and processing of Pokémon data for the Pokémon application.
 * It imports necessary constants and functions from various modules to fetch and manage Pokémon data,
 * including details, flavor text, genera text, and names. The main functionality includes fetching multiple
 * arrays of Pokémon data and returning them as an object.
 */

/**
 * Importing the pokemonStart, pokemonEnd, and labels constants from the globals.js module.
 *
 * @module globals
 * @property {number} pokemonStart - Starting index for Pokémon data.
 * @property {number} pokemonEnd - Ending index for Pokémon data.
 * @property {Array} labels - Array of labels.
 */
import { pokemonStart, pokemonEnd, labels } from "./globals.js";

/**
 * Importing various functions from the pokeapiData.js module.
 *
 * @module pokeapiData
 * @function getPokemonData - Function to get Pokémon data.
 * @function getPokemonFlavorText - Function to get Pokémon flavor text.
 * @function getPokemonGeneraText - Function to get Pokémon genera text.
 * @function getPokemonNamesText - Function to get Pokémon names text.
 */
import { getPokemonData, getPokemonFlavorText, getPokemonGeneraText, getPokemonNamesText } from "./pokeapiData.js";

/**
 * Importing the renderPokemonCardTemplate function from the templates.js module.
 *
 * @module templates
 * @function renderPokemonCardTemplate - Function to render the Pokémon card template.
 */
import { renderPokemonCardTemplate } from "./templates.js";

/**
 * Fetches and returns multiple arrays of Pokémon data.
 *
 * @returns {Promise<Object>} An object containing the following arrays:
 * - `pokemonDataArray`: Array of Pokémon data.
 * - `pokemonFlavorTextArray`: Array of Pokémon flavor text.
 * - `pokemonGeneraTextArray`: Array of Pokémon genera text.
 * - `pokemonNamesTextArray`: Array of Pokémon names text.
 */
export async function getPokemonDataArrays() {
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText(); // https://www.scaler.com/topics/javascript-return-multiple-values/
  const pokemonNamesTextArray = await getPokemonNamesText(); // https://stackoverflow.com/questions/5760058/how-to-return-multiple-arrays-from-a-function-in-javascript
  return { pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray };
}

/**
 * Renders the Pokémon cards on the page.
 *
 * This function checks if the element with the ID "contentCards" exists. If not, it creates the element.
 * It then clears the inner HTML of the "contentCards" element and fetches the Pokémon data arrays.
 * For each Pokémon in the specified range, it appends a rendered Pokémon card template to the "contentCards" element.
 *
 * @async
 * @function renderPokemonCards
 * @returns {Promise<void>} A promise that resolves when the Pokémon cards have been rendered.
 */
export async function renderPokemonCards() {
  if (document.getElementById("contentCards") == null) createContentCards();
  let contentCardsRef = document.getElementById("contentCards");
  contentCardsRef.innerHTML = "";
  const { pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray } = await getPokemonDataArrays();
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonEnd; IndexPokeID++) {
    contentCardsRef.innerHTML += renderPokemonCardTemplate(
      pokemonDataArray[IndexPokeID - 1],
      pokemonFlavorTextArray[IndexPokeID - 1],
      pokemonGeneraTextArray[IndexPokeID - 1],
      pokemonNamesTextArray[IndexPokeID - 1],
      labels
    );
  }
}

/**
 * Creates and inserts the content cards section into the DOM.
 * This function selects the element with the ID "content" and sets its inner HTML
 * to include a section with the class "contentCards" and ID "contentCards".
 */
export function createContentCards() {
  const contentCardsRef = document.getElementById("content");
  contentCardsRef.innerHTML = /*html*/ `
    <section class="contentCards" id="contentCards"></section>
  `;
}
