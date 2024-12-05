/**
 * @fileoverview This script initializes and manages the main functionality of the Pokémon application.
 * It imports necessary functions and constants from various modules to handle navigation, data preloading,
 * loading screen display, language settings, and rendering of Pokémon cards and details.
 */

/**
 * Importing the backToHome, backward, and forward functions from the navigate.js module.
 *
 * @module navigate
 * @function backToHome - Function to navigate back to the home view.
 * @function backward - Function to navigate backward.
 * @function forward - Function to navigate forward.
 */
import { backToHome, backward, forward } from "./navigate.js";

/**
 * Importing the preLoadPokemonAPIData function from the pokeapiData.js module.
 *
 * @module pokeapiData
 * @function preLoadPokemonAPIData - Function to preload Pokémon API data.
 */
import { preLoadPokemonAPIData } from "./pokeapiData.js";

/**
 * Importing the showLoadingScreen function from the loadingScreen.js module.
 *
 * @module loadingScreen
 * @function showLoadingScreen - Function to show the loading screen.
 */
import { showLoadingScreen } from "./loadingScreen.js";

/**
 * Importing the selectedLanguage constant from the language.js module.
 *
 * @module language
 * @property {string} selectedLanguage - Selected language setting.
 */
import { selectedLanguage } from "./language.js";

/**
 * Importing the renderPokemonCards function from the cards.js module.
 *
 * @module cards
 * @function renderPokemonCards - Function to render Pokémon cards.
 */
import { renderPokemonCards } from "./cards.js";

/**
 * Importing the showPokemonDetails, renderPokemonDetails, and playSound functions from the bigCard.js module.
 *
 * @module bigCard
 * @function showPokemonDetails - Function to show Pokémon details.
 * @function renderPokemonDetails - Function to render Pokémon details.
 * @function playSound - Function to play a sound.
 */
import { showPokemonDetails, renderPokemonDetails, playSound } from "./bigCard.js";

/**
 * Importing the clickSuggestions, getSuggestions, and pokemonSearchButton functions from the search.js module.
 *
 * @module search
 * @function clickSuggestions - Function to handle click suggestions.
 * @function getSuggestions - Function to get suggestions.
 * @function pokemonSearchButton - Function to handle Pokémon search button.
 */
import { clickSuggestions, getSuggestions, pokemonSearchButton } from "./search.js";

/**
 * Importing the getUserName function from the yourName.js module.
 *
 * @module yourName
 * @function getUserName - Function to get the user's name.
 */
import { getUserName } from "./yourName.js";

/**
 * Importing the renderImprint function from the imprint.js module.
 *
 * @module imprint
 * @function renderImprint - Function to render the imprint.
 */
import { renderImprint } from "./imprint.js";

/**
 * Importing the renderPrivacyPolicy function from the privacyPolicy.js module.
 *
 * @module privacyPolicy
 * @function renderPrivacyPolicy - Function to render the privacy policy.
 */
import { renderPrivacyPolicy } from "./privacyPolicy.js";

/**
 * Importing the renderNav function from the nav.js module.
 *
 * @module nav
 * @function renderNav - Function to render the navigation.
 */
import { renderNav } from "./nav.js";

/**
 * Importing the renderFooter function from the footer.js module.
 *
 * @module footer
 * @function renderFooter - Function to render the footer.
 */
import { renderFooter } from "./footer.js";

/**
 * Importing the selectedPokemonLimit and toggleRegionsMenu functions from the pokemonRegions.js module.
 *
 * @module pokemonRegions
 * @function selectedPokemonLimit - Function to select the Pokémon limit.
 * @function toggleRegionsMenu - Function to toggle the regions menu.
 */
import { selectedPokemonLimit, toggleRegionsMenu } from "./pokemonRegions.js";

/**
 * Assigns the showPokemonDetails function to the global window object.
 *
 * @global
 * @function showPokemonDetails
 */
window.showPokemonDetails = showPokemonDetails;

/**
 * Assigns the renderPokemonDetails function to the global window object.
 *
 * @global
 * @function renderPokemonDetails
 */
window.renderPokemonDetails = renderPokemonDetails;

/**
 * Assigns the selectedLanguage constant to the global window object.
 *
 * @global
 * @property {string} selectedLanguage
 */
window.selectedLanguage = selectedLanguage;

/**
 * Assigns the clickSuggestions function to the global window object.
 *
 * @global
 * @function clickSuggestions
 */
window.clickSuggestions = clickSuggestions;

/**
 * Assigns the pokemonSearchButton function to the global window object.
 *
 * @global
 * @function pokemonSearchButton
 */
window.pokemonSearchButton = pokemonSearchButton;

/**
 * Assigns the backToHome function to the global window object.
 *
 * @global
 * @function backToHome
 */
window.backToHome = backToHome;

/**
 * Assigns the backward function to the global window object.
 *
 * @global
 * @function backward
 */
window.backward = backward;

/**
 * Assigns the forward function to the global window object.
 *
 * @global
 * @function forward
 */
window.forward = forward;

/**
 * Assigns the getUserName function to the global window object.
 *
 * @global
 * @function getUserName
 */
window.getUserName = getUserName;

/**
 * Assigns the toggleRegionsMenu function to the global window object.
 *
 * @global
 * @function toggleRegionsMenu
 */
window.toggleRegionsMenu = toggleRegionsMenu;

/**
 * Assigns the selectedPokemonLimit function to the global window object.
 *
 * @global
 * @function selectedPokemonLimit
 */
window.selectedPokemonLimit = selectedPokemonLimit;

/**
 * Assigns the loadAndRenderPokemonCards function to the global window object.
 *
 * @global
 * @function loadAndRenderPokemonCards
 */
window.loadAndRenderPokemonCards = loadAndRenderPokemonCards;

/**
 * Assigns the renderImprint function to the global window object.
 *
 * @global
 * @function renderImprint
 */
window.renderImprint = renderImprint;

/**
 * Assigns the renderPrivacyPolicy function to the global window object.
 *
 * @global
 * @function renderPrivacyPolicy
 */
window.renderPrivacyPolicy = renderPrivacyPolicy;

/**
 * Assigns the renderNav function to the global window object.
 *
 * @global
 * @function renderNav
 */
window.renderNav = renderNav;

/**
 * Assigns the renderFooter function to the global window object.
 *
 * @global
 * @function renderFooter
 */
window.renderFooter = renderFooter;

/**
 * Assigns the playSound function to the global window object.
 *
 * @global
 * @function playSound
 */
window.playSound = playSound;

/**
 * Calls the renderNav function to render the navigation.
 */
renderNav();

/**
 * Calls the renderFooter function to render the footer.
 */
renderFooter();

/**
 * Asynchronously loads and renders Pokémon cards.
 *
 * This function performs the following steps:
 * 1. Displays a loading screen.
 * 2. Preloads Pokémon API data.
 * 3. Marks the loading process as completed.
 * 4. Renders the Pokémon cards.
 * 5. Retrieves suggestions.
 *
 * @async
 * @function loadAndRenderPokemonCards
 * @returns {Promise<void>} A promise that resolves when the Pokémon cards have been loaded and rendered.
 */
async function loadAndRenderPokemonCards() {
  showLoadingScreen();
  await preLoadPokemonAPIData();
  overwriteLoadingCompleted(true);
  renderPokemonCards();
  getSuggestions();
}
loadAndRenderPokemonCards();
