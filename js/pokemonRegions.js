/**
 * @fileoverview This module handles the functionality related to Pokémon regions in the Pokémon application.
 * It imports necessary constants and functions to manage the regions menu and render Pokémon cards based on the selected region.
 */

/**
 * Importing various constants from the globals.js module.
 *
 * @module globals
 * @property {boolean} RegionsMenuOpen - Flag indicating if the regions menu is open.
 * @property {Object} contentRef - Reference to the content element.
 * @property {Object} navRef - Reference to the navigation element.
 * @property {number} pokemonLimit - Limit for the number of Pokémon.
 */
import { RegionsMenuOpen, contentRef, navRef, pokemonLimit } from "./globals.js";

/**
 * Importing the renderPokemonCards function from the cards.js module.
 *
 * @module cards
 * @function renderPokemonCards - Function to render Pokémon cards.
 */
import { renderPokemonCards } from "./cards.js";

/**
 * Toggles the visibility and animation of the regions menu.
 *
 * This function handles the display and animation of the regions menu by toggling
 * CSS classes. It first checks if the menu is open, then toggles the 'd_none' class
 * to show or hide the menu. After a short delay, it toggles the 'transformIn' class
 * to animate the menu. If the menu was initially closed, it hides the menu again
 * after the animation completes. Finally, it updates the state of the menu.
 *
 * @function toggleRegionsMenu
 */
export function toggleRegionsMenu() {
  const selectedPokemonRegionsRef = document.getElementById("selectedPokemonRegions");
  if (!RegionsMenuOpen) selectedPokemonRegionsRef.classList.toggle("d_none");
  setTimeout(() => {
    selectedPokemonRegionsRef.classList.toggle("transformIn");
    if (!RegionsMenuOpen) setTimeout(() => selectedPokemonRegionsRef.classList.toggle("d_none"), 1000);
  }, 10);
  overwriteRegionsMenuOpen(!RegionsMenuOpen);
}

/**
 * Adjusts the range and limit of selected Pokémon, updates the UI, and triggers the rendering of Pokémon cards.
 *
 * @param {number} selectedPokemonStart - The starting index of the selected Pokémon range.
 * @param {number} selectedPokemonEnd - The ending index of the selected Pokémon range.
 * @param {number} selectedPokemonLimit - The new limit for the number of selected Pokémon.
 */
export function selectedPokemonLimit(selectedPokemonStart, selectedPokemonEnd, selectedPokemonLimit) {
  overwritePokemonStart(selectedPokemonStart);
  overwritePokemonEnd(selectedPokemonEnd);
  toggleRegionsMenu();
  if (selectedPokemonLimit > pokemonLimit) {
    overwritePokemonLimit(selectedPokemonLimit);
    setTimeout(() => loadAndRenderPokemonCards(), 1000);
  } else {
    renderPokemonCards();
  }
}

/**
 * Event listener for keydown events.
 * Toggles the regions menu if the Escape key is pressed and the regions menu is open.
 *
 * @param {KeyboardEvent} event - The keydown event object.
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && RegionsMenuOpen) toggleRegionsMenu();
});

/**
 * Event listener for click events.
 * Toggles the regions menu if the click event target is either the content reference or the navigation reference and the regions menu is open.
 *
 * @param {MouseEvent} event - The click event object.
 */
document.addEventListener("click", function (event) {
  if ((event.target === contentRef && RegionsMenuOpen) || (event.target === navRef && RegionsMenuOpen)) toggleRegionsMenu();
});
