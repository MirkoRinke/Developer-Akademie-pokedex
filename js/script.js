import { backToHome, backward, forward } from "./navigate.js";
import { preLoadPokemonAPIData, selectedPokemonLimit, showRegionsMenu } from "./pokeapiData.js";
import { showLoadingScreen } from "./loadingScreen.js";
import { selectedLanguage } from "./language.js";
import { renderPokemonCards } from "./cards.js";
import { showPokemonDetails, renderPokemonDetails } from "./bigCard.js";
import { clickSuggestions, getSuggestions } from "./search.js";
import { getUserName } from "./yourName.js";

window.showPokemonDetails = showPokemonDetails;
window.renderPokemonDetails = renderPokemonDetails;
window.selectedLanguage = selectedLanguage;
window.clickSuggestions = clickSuggestions;
window.backToHome = backToHome;
window.backward = backward;
window.forward = forward;
window.getUserName = getUserName;
window.showRegionsMenu = showRegionsMenu;
window.selectedPokemonLimit = selectedPokemonLimit;
window.loadAndRenderPokemonCards = loadAndRenderPokemonCards;

//! render PokemonCards after preLoad
async function loadAndRenderPokemonCards() {
  showLoadingScreen();
  await preLoadPokemonAPIData();
  overwriteLoadingCompleted(true);
  renderPokemonCards();
  getSuggestions();
}
loadAndRenderPokemonCards();
