/**
 * @fileoverview This module handles the rendering of the footer component in the Pokémon application.
 * It imports necessary references and functions from various modules to manage the footer's content
 * and rendering based on the current language setting.
 */

/**
 * Importing the footerRef and currentLanguage constants from the globals.js module.
 *
 * @module globals
 * @property {Object} footerRef - Reference to the footer element.
 * @property {string} currentLanguage - Current language setting.
 */
import { footerRef, currentLanguage } from "./globals.js";

/**
 * Importing the renderFooterTemplate function from the templates.js module.
 *
 * @module templates
 * @function renderFooterTemplate - Function to render the footer template.
 */
import { renderFooterTemplate } from "./templates.js";

/**
 * Renders the footer by setting the inner HTML of the footer reference element.
 * The content is generated using the current language setting.
 *
 * @function
 */
export function renderFooter() {
  footerRef.innerHTML = renderFooterTemplate(currentLanguage);
}
