/**
 * @fileoverview This module handles the rendering of the privacy policy section in the Pokémon application.
 * It imports necessary functions to render the privacy policy template and manage the visibility of navigation
 * and menu buttons.
 */

/**
 * Importing the renderPrivacyPolicyTemplate function from the templates.js module.
 *
 * @module templates
 * @function renderPrivacyPolicyTemplate - Function to render the privacy policy template.
 */
import { renderPrivacyPolicyTemplateDE, renderPrivacyPolicyTemplateEN } from './templates.js';

/**
 * Importing the currentLanguage variable from the globals.js module.
 *
 * @module globals
 * @var {string} currentLanguage - The current language of the application.
 */
import { currentLanguage } from './globals.js';

/**
 * Importing the navButtonsHide and menuButtonsHide functions from the navigate.js module.
 *
 * @module navigate
 * @function navButtonsHide - Function to hide navigation buttons.
 * @function menuButtonsHide - Function to hide menu buttons.
 */
import { navButtonsHide, menuButtonsHide } from './navigate.js';

/**
 * Renders the privacy policy content on the page.
 *
 * This function retrieves the element with the ID "content" and sets its inner HTML
 * to the result of the `renderPrivacyPolicyTemplate` function. It also hides the
 * navigation and menu buttons by calling `navButtonsHide` and `menuButtonsHide` respectively.
 *
 * @async
 * @function renderPrivacyPolicy
 */
export async function renderPrivacyPolicy() {
  const contentRef = document.getElementById('content');
  if (currentLanguage == 'de') contentRef.innerHTML = renderPrivacyPolicyTemplateDE();
  if (currentLanguage == 'en') contentRef.innerHTML = renderPrivacyPolicyTemplateEN();
  if (currentLanguage == 'ja') contentRef.innerHTML = renderPrivacyPolicyTemplateEN();
  navButtonsHide();
  menuButtonsHide();
}
