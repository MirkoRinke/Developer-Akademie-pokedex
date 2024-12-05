/**
 * @fileoverview This module handles the display of the loading screen in the Pokémon application.
 * It imports necessary functions to render the loading screen and create content cards.
 */

/**
 * Importing the renderShowLoadingScreen function from the templates.js module.
 *
 * @module templates
 * @function renderShowLoadingScreen - Function to render the loading screen.
 */
import { renderShowLoadingScreen } from "./templates.js";

/**
 * Importing the createContentCards function from the cards.js module.
 *
 * @module cards
 * @function createContentCards - Function to create content cards.
 */
import { createContentCards } from "./cards.js";

/**
 * Displays a loading screen by clearing the content of the element with the ID "contentCards"
 * and populating it with loading screen elements.
 * If the element with the ID "contentCards" does not exist, it creates the element first.
 */
export function showLoadingScreen() {
  let contentCardsRef = document.getElementById("contentCards");
  if (contentCardsRef == null) {
    createContentCards();
    contentCardsRef = document.getElementById("contentCards");
  }
  contentCardsRef.innerHTML = "";
  for (let index = 1; index < 11; index++) {
    contentCardsRef.innerHTML += renderShowLoadingScreen();
  }
}
