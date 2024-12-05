/**
 * @fileoverview This module handles the rendering of the navigation bar in the Pokémon application.
 * It imports necessary constants and functions to manage the navigation content based on the current language setting.
 */

/**
 * Importing the navRef and currentLanguage constants from the globals.js module.
 *
 * @module globals
 * @property {Object} navRef - Reference to the navigation element.
 * @property {string} currentLanguage - Current language setting.
 */
import { navRef, currentLanguage } from "./globals.js";

/**
 * Importing the renderNavTemplate function from the templates.js module.
 *
 * @module templates
 * @function renderNavTemplate - Function to render the navigation template.
 */
import { renderNavTemplate } from "./templates.js";

/**
 * Importing the getSelectedLanguage function from the language.js module.
 *
 * @module language
 * @function getSelectedLanguage - Function to get the selected language.
 */
import { getSelectedLanguage } from "./language.js";

/**
 * Renders the navigation bar with a placeholder text based on the current language.
 *
 * The function sets the placeholder text according to the `currentLanguage` variable.
 * It supports German ("de"), English ("en"), and Japanese ("ja").
 * The navigation bar's inner HTML is updated using the `renderNavTemplate` function.
 * Finally, it calls `getSelectedLanguage` to retrieve the selected language.
 *
 * @function renderNav
 */
export function renderNav() {
  let placeholderText = "";
  if (currentLanguage === "de") placeholderText = "Dein Name dein Pokemon";
  if (currentLanguage === "en") placeholderText = "Your name your Pokemon";
  if (currentLanguage === "ja") placeholderText = "君の名とポケモン";
  navRef.innerHTML = renderNavTemplate(currentLanguage, placeholderText);
  getSelectedLanguage();
}
