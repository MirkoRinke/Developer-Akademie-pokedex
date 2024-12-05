/**
 * @fileoverview This module handles the search functionality in the Pokémon application.
 * It imports necessary constants and functions to manage search suggestions, render Pokémon cards,
 * and handle input events for the search field.
 */

/**
 * Importing various constants from the globals.js module.
 *
 * @module globals
 * @property {Array} searchSuggestions - Array for search suggestions.
 * @property {Array} pokemonDataCache - Cache for Pokémon data.
 * @property {Array} labels - Array of labels.
 * @property {boolean} loadingCompleted - Flag indicating if loading is completed.
 */
import { searchSuggestions, pokemonDataCache, labels, loadingCompleted } from "./globals.js";

/**
 * Importing the renderPokemonCards and getPokemonDataArrays functions from the cards.js module.
 *
 * @module cards
 * @function renderPokemonCards - Function to render Pokémon cards.
 * @function getPokemonDataArrays - Function to get arrays of Pokémon data.
 */
import { renderPokemonCards, getPokemonDataArrays } from "./cards.js";

/**
 * Importing the renderPokemonCardTemplate function from the templates.js module.
 *
 * @module templates
 * @function renderPokemonCardTemplate - Function to render the Pokémon card template.
 */
import { renderPokemonCardTemplate } from "./templates.js";

/**
 * Importing the navButtonsShow function from the navigate.js module.
 *
 * @module navigate
 * @function navButtonsShow - Function to show navigation buttons.
 */
import { navButtonsShow } from "./navigate.js";

/**
 * Handles the input event for the Pokémon search input field.
 * If the input length is 3 or more characters, it searches for Pokémon by name.
 * Otherwise, it renders all Pokémon cards and shows navigation buttons.
 *
 * @function pokemonSearchInput
 * @returns {void}
 */
function pokemonSearchInput() {
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (!loadingCompleted) return;
  if (pokemonSearchInputRef.value.length >= 3) {
    searchPokemonByName(pokemonSearchInputRef.value);
  } else {
    renderPokemonCards();
    navButtonsShow();
  }
}

/**
 * Handles the search button click event for the Pokémon search.
 * If the loading is not completed, the function returns early.
 * Hides the search suggestions and triggers the Pokémon search input function.
 */
export function pokemonSearchButton() {
  if (!loadingCompleted) return;
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  searchSuggestionsRef.classList.add("d_none");
  pokemonSearchInput();
}

/**
 * Adds an event listener to the document that listens for input events.
 * When an input event occurs, it checks if the active element is the Pokémon search input field.
 * If the active element is the Pokémon search input field, it triggers the Pokémon search input function.
 */
document.addEventListener("input", function () {
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (document.activeElement === pokemonSearchInputRef) pokemonSearchInput();
});

/**
 * Searches for Pokémon by name and renders the selected Pokémon cards.
 *
 * This function searches through the cached Pokémon data to find Pokémon whose names
 * match the search query. It supports multiple languages by checking different name indices.
 * If the cache is empty, it preloads the Pokémon API data.
 *
 * @async
 * @function searchPokemonByName
 * @param {string} search - The search query to find Pokémon by name.
 * @returns {Promise<void>} - A promise that resolves when the search and rendering are complete.
 */
async function searchPokemonByName(search) {
  if (pokemonDataCache.length === 0) await preLoadPokemonAPIData();
  const selectedPokemonIDs = [];
  const searchLower = search.toLowerCase();
  pokemonDataCache.forEach((pokemon, IndexPokeID) => {
    if (pokemon) {
      const pokemonNames = [pokemon.species.names[8].name, pokemon.species.names[5].name, pokemon.species.names[9].name];
      if (pokemonNames.some((name) => name.toLowerCase().includes(searchLower))) selectedPokemonIDs.push(IndexPokeID); // https://www.w3schools.com/jsref/jsref_some.asp
    }
  });
  renderSelectedPokemonCards(selectedPokemonIDs);
}

/**
 * Renders selected Pokémon cards based on the provided Pokémon IDs.
 * Limits the number of Pokémon cards to 10.
 *
 * @param {number[]} selectedPokemonIDs - An array of selected Pokémon IDs.
 * @returns {Promise<void>} - A promise that resolves when the Pokémon cards are rendered.
 */
async function renderSelectedPokemonCards(selectedPokemonIDs) {
  selectedPokemonIDs.length = 10;
  const contentRef = document.getElementById("contentCards"); // https://www.w3schools.com/js/js_destructuring.asp
  contentRef.innerHTML = "";
  const { pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray } = await getPokemonDataArrays();
  for (let pokeID of selectedPokemonIDs) {
    if (pokeID >= 1) {
      contentRef.innerHTML += renderPokemonCardTemplate(
        pokemonDataArray[pokeID - 1],
        pokemonFlavorTextArray[pokeID - 1],
        pokemonGeneraTextArray[pokeID - 1],
        pokemonNamesTextArray[pokeID - 1],
        labels
      );
    }
  }
}

//! Search Suggestions
/**
 * Fetches and populates search suggestions with Pokémon names.
 *
 * This function checks if the Pokémon data cache is empty and, if so, preloads the Pokémon API data.
 * It then iterates through the cached Pokémon data and extracts names in different languages,
 * adding them to the search suggestions if they are not already included.
 *
 * @async
 * @function getSuggestions
 * @returns {Promise<void>} A promise that resolves when the suggestions have been populated.
 */
export async function getSuggestions() {
  if (pokemonDataCache.length === 0) await preLoadPokemonAPIData();
  pokemonDataCache.forEach((pokemon) => {
    if (!pokemon) return;
    const pokemonNames = [pokemon.species.names[8].name, pokemon.species.names[5].name, pokemon.species.names[9].name];
    pokemonNames.forEach((name) => {
      if (!searchSuggestions.includes(name)) searchSuggestions.push(name);
    });
  });
}

/**
 * Event listener for input events on the document.
 * This function handles the search input for Pokémon names and displays search suggestions.
 */
document.addEventListener("input", function () {
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  if (document.activeElement === pokemonSearchInputRef) {
    const query = pokemonSearchInputRef.value.toLowerCase();
    searchSuggestionsRef.innerHTML = "";
    searchSuggestionsRef.classList.add("d_none");
    if (pokemonSearchInputRef.value.length < 3) return;
    showSearchSuggestions(query);
  }
});

/**
 * Displays search suggestions based on the provided query.
 *
 * This function filters the `searchSuggestions` array to find Pokémon names that start with the given query.
 * It then updates the DOM to show the filtered suggestions in the `searchSuggestions` element.
 *
 * @param {string} query - The search query used to filter suggestions.
 */
function showSearchSuggestions(query) {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  if (query) {
    const filteredSuggestions = searchSuggestions.filter((pokemon) => pokemon.toLowerCase().startsWith(query.toLowerCase()));
    searchSuggestionsRef.classList.remove("d_none");
    if (filteredSuggestions.length === 0) searchSuggestionsRef.classList.add("d_none");
    searchSuggestionsRef.innerHTML = "";
    filteredSuggestions.forEach((pokemon, index) => {
      searchSuggestionsRef.innerHTML += /*html*/ `
        <div tabindex="${index + 102}" class="suggestion" onclick="clickSuggestions('${pokemon}');">${pokemon}</div>
      `;
    });
  }
}

/**
 * Handles the click event on search suggestions.
 *
 * This function updates the search input value with the selected suggestion,
 * hides the suggestions dropdown, and triggers the search input event.
 *
 * @param {string} filteredSuggestions - The selected suggestion to be set in the search input.
 */
export function clickSuggestions(filteredSuggestions) {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  pokemonSearchInputRef.value = filteredSuggestions;
  searchSuggestionsRef.classList.add("d_none");
  pokemonSearchInput();
}

/**
 * Adds an event listener for the "keydown" event.
 * When the Enter key is pressed while the search input is active,
 * it adds the "d_none" class to the search suggestions to hide them.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
 */
document.addEventListener("keydown", function (event) {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (document.activeElement === pokemonSearchInputRef) {
    if (event.key === "Enter") searchSuggestionsRef.classList.add("d_none");
  }
});

// https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
/**
 * Adds an event listener for the "blur" event to the document.
 * When the "blur" event is triggered and the active element is the Pokémon search input,
 * the CSS class "d_none" is added to the search suggestions after a delay of 300 milliseconds.
 */
document.addEventListener("blur", function () {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (document.activeElement === pokemonSearchInputRef) {
    setTimeout(function () {
      searchSuggestionsRef.classList.add("d_none");
    }, 300);
  }
});
