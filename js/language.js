/**
 * @fileoverview This module handles language settings and translations in the Pokémon application.
 * It imports necessary constants and functions to manage the current language, render Pokémon cards,
 * and update the footer and navigation based on the selected language.
 */

/**
 * Importing the currentLanguage, loadingCompleted, and RegionsMenuOpen constants from the globals.js module.
 *
 * @module globals
 * @property {string} currentLanguage - Current language setting.
 * @property {boolean} loadingCompleted - Flag indicating if loading is completed.
 * @property {boolean} RegionsMenuOpen - Flag indicating if the regions menu is open.
 */
import { currentLanguage, loadingCompleted, RegionsMenuOpen } from "./globals.js";

/**
 * Importing the renderPokemonCards function from the cards.js module.
 *
 * @module cards
 * @function renderPokemonCards - Function to render Pokémon cards.
 */
import { renderPokemonCards } from "./cards.js";

/**
 * Importing the renderFooter function from the footer.js module.
 *
 * @module footer
 * @function renderFooter - Function to render the footer.
 */
import { renderFooter } from "./footer.js";

/**
 * Importing the renderNav function from the nav.js module.
 *
 * @module nav
 * @function renderNav - Function to render the navigation.
 */
import { renderNav } from "./nav.js";

/**
 * Provides custom translations for different languages.
 *
 * @function customTranslations
 * @description This function defines translations for English (en), German (de), and Japanese (ja).
 * It then calls the `overwriteLabels` function with the translations for the current language.
 *
 * @example
 * Example usage:
 * customTranslations();
 *
 * @global
 * @returns {void}
 */
export function customTranslations() {
  const translations = {
    en: {
      size: "Size",
      weight: "Weight",
      description: "A big thanks to Ditto for the excellent modeling work.",
    },
    de: {
      size: "Größe",
      weight: "Gewicht",
      description: "Ein großer Dank an Ditto für die hervorragende Modellarbeit.",
    },
    ja: {
      size: "サイズ",
      weight: "重さ",
      description: "モデリングに優れた仕事をしたメタモンに感謝します。",
    },
  };
  overwriteLabels(translations[currentLanguage]);
}
customTranslations();

/**
 * Handles the selection of a language by the user.
 *
 * This function performs several tasks when a language is selected:
 * - Checks if loading is completed and the regions menu is closed.
 * - Overwrites the current language with the selected one.
 * - Applies custom translations.
 * - Renders the Pokémon cards, navigation, and footer.
 * - Retrieves the selected language.
 *
 * @param {string} selected - The language selected by the user.
 */
export function selectedLanguage(selected) {
  if (!loadingCompleted || RegionsMenuOpen) return;
  overwriteCurrentLanguage(selected);
  customTranslations();
  renderPokemonCards();
  renderNav();
  renderFooter();
  getSelectedLanguage();
}

/**
 * Updates the border style of language setting elements based on the current language.
 *
 * This function resets the border style of all language setting elements and then
 * sets a specific border style to the element corresponding to the current language.
 *
 * @function
 */
export function getSelectedLanguage() {
  languageSettingsJa.style.border = "";
  languageSettingsEn.style.border = "";
  languageSettingsDe.style.border = "";
  if (currentLanguage == "ja") languageSettingsJa.style.border = "3px solid rgb(182, 152, 55)";
  if (currentLanguage == "en") languageSettingsEn.style.border = "3px solid rgb(182, 152, 55)";
  if (currentLanguage == "de") languageSettingsDe.style.border = "3px solid rgb(182, 152, 55)";
}
