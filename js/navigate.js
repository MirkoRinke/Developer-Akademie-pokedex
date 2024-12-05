/**
 * @fileoverview This module handles navigation functionality in the Pokémon application.
 * It imports necessary constants and functions to manage navigation elements and render Pokémon cards.
 */

/**
 * Importing various constants and references from the globals.js module.
 *
 * @module globals
 * @property {number} pokemonStart - Starting index for Pokémon data.
 * @property {number} pokemonEnd - Ending index for Pokémon data.
 * @property {number} pokemonLimit - Limit for the number of Pokémon.
 * @property {boolean} bigCardOpen - Flag indicating if the big card is open.
 * @property {boolean} loadingCompleted - Flag indicating if loading is completed.
 * @property {Object} pokeArrowLeftContainerRef - Reference to the left arrow container.
 * @property {Object} pokeArrowRightContainerRef - Reference to the right arrow container.
 * @property {Object} pokeArrowMobileButtonsLeftRef - Reference to the left mobile button.
 * @property {Object} pokeArrowMobileButtonsRightRef - Reference to the right mobile button.
 * @property {Object} navRef - Reference to the navigation element.
 */
import {
  pokemonStart,
  pokemonEnd,
  pokemonLimit,
  bigCardOpen,
  loadingCompleted,
  pokeArrowLeftContainerRef,
  pokeArrowRightContainerRef,
  pokeArrowMobileButtonsLeftRef,
  pokeArrowMobileButtonsRightRef,
  navRef,
} from "./globals.js";

/**
 * Importing the renderPokemonCards function from the cards.js module.
 *
 * @module cards
 * @function renderPokemonCards - Function to render Pokémon cards.
 */
import { renderPokemonCards } from "./cards.js";

/**
 * Navigates back to the home view of the Pokedex application.
 *
 * This function performs several actions to reset the view to the initial state:
 * - Checks if the loading process is completed before proceeding.
 * - Resets the range of displayed Pokémon to the first 10.
 * - Renders the Pokémon cards for the initial range.
 * - Displays the navigation buttons.
 * - Displays the menu buttons.
 *
 * @function
 * @memberof module:navigate
 */
export function backToHome() {
  if (!loadingCompleted) return;
  overwritePokemonStart(1);
  overwritePokemonEnd(11);
  renderPokemonCards();
  navButtonsShow();
  menuButtonsShow();
}

/**
 * Shows navigation buttons by removing the "d_none" class from the specified elements.
 *
 * This function makes the following elements visible:
 * - pokeArrowLeftContainerRef
 * - pokeArrowRightContainerRef
 * - pokeArrowMobileButtonsLeftRef
 * - pokeArrowMobileButtonsRightRef
 */
export function navButtonsShow() {
  pokeArrowLeftContainerRef.classList.remove("d_none");
  pokeArrowRightContainerRef.classList.remove("d_none");
  pokeArrowMobileButtonsLeftRef.classList.remove("d_none");
  pokeArrowMobileButtonsRightRef.classList.remove("d_none");
}

/**
 * Hides navigation buttons by adding the "d_none" class to their respective elements.
 *
 * This function targets the following elements:
 * - pokeArrowLeftContainerRef
 * - pokeArrowRightContainerRef
 * - pokeArrowMobileButtonsLeftRef
 * - pokeArrowMobileButtonsRightRef
 */
export function navButtonsHide() {
  pokeArrowLeftContainerRef.classList.add("d_none");
  pokeArrowRightContainerRef.classList.add("d_none");
  pokeArrowMobileButtonsLeftRef.classList.add("d_none");
  pokeArrowMobileButtonsRightRef.classList.add("d_none");
}

/**
 * Retrieves references to various menu elements in the DOM.
 *
 * @returns {Object} An object containing references to menu elements:
 * - `searchRef`: Reference to the search input element.
 * - `pokemonRegionsRef`: Reference to the Pokémon regions element.
 * - `yourNameRef`: Reference to the your name input element.
 * - `languageSettingsRef`: Reference to the language settings element.
 */
function getMenuRefs() {
  return {
    searchRef: document.getElementById("search"),
    pokemonRegionsRef: document.getElementById("pokemonRegions"),
    yourNameRef: document.getElementById("yourName"),
    languageSettingsRef: document.getElementById("languageSettings"),
  };
}

/**
 * Displays the menu buttons by removing the "d_none" class from each button reference.
 * Also removes the "menuGridTemplateColumns" class from the navigation reference.
 *
 * @function
 * @name menuButtonsShow
 */
export function menuButtonsShow() {
  const { searchRef, pokemonRegionsRef, yourNameRef, languageSettingsRef } = getMenuRefs();
  searchRef.classList.remove("d_none");
  pokemonRegionsRef.classList.remove("d_none");
  yourNameRef.classList.remove("d_none");
  languageSettingsRef.classList.remove("d_none");
  navRef.classList.remove("menuGridTemplateColumns");
}

/**
 * Hides the menu buttons by adding the "d_none" class to each button's reference.
 * Also adds the "menuGridTemplateColumns" class to the navigation reference.
 *
 * @function
 * @name menuButtonsHide
 */
export function menuButtonsHide() {
  const { searchRef, pokemonRegionsRef, yourNameRef, languageSettingsRef } = getMenuRefs();
  searchRef.classList.add("d_none");
  pokemonRegionsRef.classList.add("d_none");
  yourNameRef.classList.add("d_none");
  languageSettingsRef.classList.add("d_none");
  navRef.classList.add("menuGridTemplateColumns");
}

/**
 * Advances the current view of Pokémon by updating the start and end indices.
 * If the end index exceeds the limit, it resets to the beginning or adjusts to the limit.
 * Renders the updated Pokémon cards after updating the indices.
 *
 * @function
 * @name forward
 * @returns {void}
 */
export function forward() {
  if (!loadingCompleted) return;
  if (pokemonEnd >= pokemonLimit) {
    overwritePokemonStart(1);
    overwritePokemonEnd(11);
  } else if (pokemonEnd + 10 > pokemonLimit) {
    overwritePokemonStart(pokemonStart + 10);
    overwritePokemonEnd(pokemonLimit);
  } else {
    overwritePokemonStart(pokemonStart + 10);
    overwritePokemonEnd(pokemonEnd + 10);
  }
  renderPokemonCards();
}

/**
 * Moves the current view of Pokémon backward by updating the start and end indices.
 * If the start index is less than or equal to 1, it wraps around to the end of the list.
 * Adjusts the indices accordingly and renders the updated Pokémon cards.
 *
 * @function
 * @name backward
 * @returns {void}
 */
export function backward() {
  if (!loadingCompleted) return;
  if (pokemonStart <= 1) {
    overwritePokemonStart(Math.floor(pokemonLimit / 10) * 10 + 1);
    overwritePokemonEnd(pokemonLimit);
  } else if (pokemonStart - 10 < 1) {
    overwritePokemonEnd(pokemonStart - 1);
    overwritePokemonStart(1);
  } else {
    overwritePokemonStart(pokemonStart - 10);
    if (pokemonEnd === pokemonLimit) {
      overwritePokemonEnd(pokemonStart + 10);
    } else {
      overwritePokemonEnd(pokemonEnd - 10);
    }
  }
  renderPokemonCards();
}

/**
 * Adds an event listener for the "keydown" event on the document.
 *
 * This function listens for the "ArrowRight" and "ArrowLeft" keys being pressed.
 * If the "ArrowRight" key is pressed and loading is completed, it either calls the `forward` function
 * or simulates a click on the element with the ID "pokeArrowRight" if a big card is open.
 * If the "ArrowLeft" key is pressed, it either calls the `backward` function
 * or simulates a click on the element with the ID "pokeArrowLeft" if a big card is open.
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight" && loadingCompleted) {
    !bigCardOpen ? forward() : document.getElementById("pokeArrowRight").click();
  } else if (event.key === "ArrowLeft") {
    !bigCardOpen ? backward() : document.getElementById("pokeArrowLeft").click();
  }
});

/**
 * Adds an event listener for the "keydown" event.
 * When the "Enter" key is pressed and both `bigCardOpen` is false and `loadingCompleted` is true,
 * the currently focused element is clicked.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !bigCardOpen && loadingCompleted) {
    const activeElement = document.activeElement;
    if (activeElement) activeElement.click();
  }
});
