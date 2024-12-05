/**
 * @fileoverview This module handles the rendering of the imprint section in the Pokémon application.
 * It imports necessary functions to render the imprint template and manage the visibility of navigation
 * and menu buttons.
 */

/**
 * Importing the renderImprintTemplate function from the templates.js module.
 *
 * @module templates
 * @function renderImprintTemplate - Function to render the imprint template.
 */
import { renderImprintTemplate } from "./templates.js";

/**
 * Importing the navButtonsHide and menuButtonsHide functions from the navigate.js module.
 *
 * @module navigate
 * @function navButtonsHide - Function to hide navigation buttons.
 * @function menuButtonsHide - Function to hide menu buttons.
 */
import { navButtonsHide, menuButtonsHide } from "./navigate.js";

/**
 * Renders the imprint section of the application.
 *
 * This function updates the inner HTML of the element with the ID "content"
 * to display the imprint template. It also hides the navigation and menu buttons.
 *
 * @async
 * @function renderImprint
 */
export async function renderImprint() {
  const contentRef = document.getElementById("content");
  contentRef.innerHTML = renderImprintTemplate();
  navButtonsHide();
  menuButtonsHide();
}
