import { Pokedex } from '../../node_modules/pokeapi-js-wrapper/src/index.js';

/**
 * @fileoverview This module defines and exports various global constants and variables used throughout the Pokémon application.
 * It includes references to DOM elements, configuration options for the Pokedex instance, and other shared resources.
 */

/**
 * Custom options for the Pokedex instance.
 *
 * @constant {Object} customOptions
 * @property {string} protocol - Protocol to use (https).
 * @property {string} hostName - Hostname of the API.
 * @property {string} versionPath - Path to the API version.
 * @property {boolean} cache - Enable or disable caching.
 * @property {number} timeout - Timeout duration in milliseconds.
 * @property {boolean} cacheImages - Enable or disable image caching.
 */
const customOptions = {
  protocol: 'https',
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 3000, // 15s
  cacheImages: true,
};

/**
 * Exporting various constants and variables.
 *
 * @module globals
 * @property {Object} P - Instance of Pokedex with custom options.
 * @property {Object} contentBigCardRef - Reference to the content of the big card.
 * @property {Object} contentRef - Reference to the content element.
 * @property {Object} pokeArrowLeftContainerRef - Reference to the left arrow container.
 * @property {Object} pokeArrowRightContainerRef - Reference to the right arrow container.
 * @property {Object} pokeArrowMobileButtonsLeftRef - Reference to the left mobile button.
 * @property {Object} pokeArrowMobileButtonsRightRef - Reference to the right mobile button.
 * @property {Object} navRef - Reference to the navigation element.
 * @property {HTMLCollection} cardRef - Collection of card elements.
 * @property {HTMLCollection} pokemonCardRef - Collection of Pokémon card elements.
 * @property {HTMLCollection} containerRef - Collection of container elements.
 * @property {Object} languageSettingsJa - Reference to the Japanese language settings element.
 * @property {Object} languageSettingsEn - Reference to the English language settings element.
 * @property {Object} languageSettingsDe - Reference to the German language settings element.
 * @property {Object} footerRef - Reference to the footer element.
 * @property {Audio} soundGiulianoSong - Audio object for Giuliano song.
 * @property {Array} searchSuggestions - Array for search suggestions.
 * @property {Array} pokemonDataCache - Cache for Pokémon data.
 */
export const P = new Pokedex(customOptions);
export const contentBigCardRef = document.getElementById('contentBigCard');
export const contentRef = document.getElementById('content');
export const pokeArrowLeftContainerRef = document.getElementById('pokeArrowLeftContainer');
export const pokeArrowRightContainerRef = document.getElementById('pokeArrowRightContainer');
export const pokeArrowMobileButtonsLeftRef = document.getElementById('pokeArrowMobileButtonsLeft');
export const pokeArrowMobileButtonsRightRef = document.getElementById('pokeArrowMobileButtonsRight');
export const navRef = document.getElementById('nav');
export const cardRef = document.getElementsByClassName('card');
export const pokemonCardRef = document.getElementsByClassName('pokemonCard');
export const containerRef = document.getElementsByClassName('container');
export const languageSettingsJa = document.getElementById('languageSettingsJa');
export const languageSettingsEn = document.getElementById('languageSettingsEn');
export const languageSettingsDe = document.getElementById('languageSettingsDe');
export const footerRef = document.getElementById('footer');
export const soundGiulianoSong = new Audio('./assets/sounds/giuliano_song.mp3');
export let searchSuggestions = [];
export let pokemonDataCache = [];

export let pokemonLimit = 152;
/**
 * Overwrites the pokemonLimit variable.
 * @param {number} overwrite - The new limit for Pokemon.
 */
window.overwritePokemonLimit = overwritePokemonLimit;
function overwritePokemonLimit(overwrite) {
  pokemonLimit = overwrite;
}

export let pokemonStart = 1;
/**
 * Overwrites the pokemonStart variable.
 * @param {number} overwrite - The new starting index for Pokemon.
 */
window.overwritePokemonStart = overwritePokemonStart;
function overwritePokemonStart(overwrite) {
  pokemonStart = overwrite;
}

export let pokemonEnd = 11;
/**
 * Overwrites the pokemonEnd variable.
 * @param {number} overwrite - The new ending index for Pokemon.
 */
window.overwritePokemonEnd = overwritePokemonEnd;
function overwritePokemonEnd(overwrite) {
  pokemonEnd = overwrite;
}

export let currentLanguage = 'de';
/**
 * Overwrites the currentLanguage variable.
 * @param {string} overwrite - The new language setting.
 */
window.overwriteCurrentLanguage = overwriteCurrentLanguage;
function overwriteCurrentLanguage(overwrite) {
  currentLanguage = overwrite;
}

export let labels = {};
/**
 * Overwrites the labels variable.
 * @param {Object} overwrite - The new labels object.
 */
window.overwriteLabels = overwriteLabels;
function overwriteLabels(overwrite) {
  labels = overwrite;
}

export let bigCardOpen = false;
/**
 * Overwrites the bigCardOpen variable.
 * @param {boolean} overwrite - The new state of the big card.
 */
window.overwriteBigCardOpen = overwriteBigCardOpen;
function overwriteBigCardOpen(overwrite) {
  bigCardOpen = overwrite;
}

export let loadingCompleted = false;
/**
 * Overwrites the loadingCompleted variable.
 * @param {boolean} overwrite - The new state of loading completion.
 */
window.overwriteLoadingCompleted = overwriteLoadingCompleted;
function overwriteLoadingCompleted(overwrite) {
  loadingCompleted = overwrite;
}

export let RegionsMenuOpen = false;
/**
 * Overwrites the RegionsMenuOpen variable.
 * @param {boolean} overwrite - The new state of the regions menu.
 */
window.overwriteRegionsMenuOpen = overwriteRegionsMenuOpen;
function overwriteRegionsMenuOpen(overwrite) {
  RegionsMenuOpen = overwrite;
}
