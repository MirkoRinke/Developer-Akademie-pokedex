/**
 * @fileoverview This module handles the functionality related to retrieving and processing the user's name in the Pokémon application.
 * It imports necessary constants and functions to manage user input, convert the name to a Pokémon name, and handle keydown events.
 */

/**
 * Importing the pokemonLimit and loadingCompleted constants from the globals.js module.
 *
 * @module globals
 * @property {number} pokemonLimit - Limit for the number of Pokémon.
 * @property {boolean} loadingCompleted - Flag indicating if loading is completed.
 */
import { pokemonLimit, loadingCompleted } from "./globals.js";

/**
 * Retrieves the user's name from an input field, clears the input after a short delay,
 * and converts the name to a Pokémon name.
 *
 * @returns {string} The Pokémon name derived from the user's input.
 */
export function getUserName() {
  if (!loadingCompleted) return;
  const userNameInputRef = document.getElementById("userNameInput");
  let userName = userNameInputRef.value;
  setTimeout(() => (userNameInputRef.value = ""), 300);
  return nameToPokemon(userName);
}

/**
 * Adds an event listener to the document that listens for keydown events.
 * If the Enter key is pressed while the userNameInput field is focused,
 * it triggers the getUserName function.
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 */
document.addEventListener("keydown", function (event) {
  const userNameInputRef = document.getElementById("userNameInput");
  if (document.activeElement === userNameInputRef) {
    if (event.key === "Enter") getUserName();
  }
});

// https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript
/**
 * Converts a user's name to a corresponding Pokémon index and displays the Pokémon details.
 *
 * @param {string} userName - The name of the user to be converted to a Pokémon.
 * @returns {void}
 */
function nameToPokemon(userName) {
  if (userName == "") return;
  let hash = 0;
  let pokemonArray = [];
  for (let i = 1; i < pokemonLimit; i++) pokemonArray.push(i);
  userName = userName.toLowerCase();
  for (let i = 0; i < userName.length; i++) {
    let char = userName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  let index = Math.abs(hash) % pokemonArray.length; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
  if (hash == 102355 || hash == 1272019794) index = 144;
  return showPokemonDetails(index);
}
