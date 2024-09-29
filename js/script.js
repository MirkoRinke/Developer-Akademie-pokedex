import { backToHome, backward, forward } from "./navigate.js";
import { preLoadPokemonAPIData } from "./pokeapiData.js";
import { showLoadingScreen } from "./loadingScreen.js";
import { selectedLanguage } from "./language.js";
import { renderPokemonCards } from "./cards.js";
import { showPokemonDetails, renderPokemonDetails } from "./bigCard.js";
import { clickSuggestions, getSuggestions } from "./search.js";
import { getUserName } from "./yourName.js";
import { renderImprint } from "./imprint.js";
import { renderPrivacyPolicy } from "./privacyPolicy.js";
import { renderNav } from "./nav.js";
import { renderFooter } from "./footer.js";
import { selectedPokemonLimit, toggleRegionsMenu } from "./pokemonRegions.js";

window.showPokemonDetails = showPokemonDetails;
window.renderPokemonDetails = renderPokemonDetails;
window.selectedLanguage = selectedLanguage;
window.clickSuggestions = clickSuggestions;
window.backToHome = backToHome;
window.backward = backward;
window.forward = forward;
window.getUserName = getUserName;
window.toggleRegionsMenu = toggleRegionsMenu;
window.selectedPokemonLimit = selectedPokemonLimit;
window.loadAndRenderPokemonCards = loadAndRenderPokemonCards;
window.renderImprint = renderImprint;
window.renderPrivacyPolicy = renderPrivacyPolicy;
window.renderNav = renderNav;
window.renderFooter = renderFooter;

renderNav();
renderFooter();

//! render PokemonCards after preLoad
async function loadAndRenderPokemonCards() {
  showLoadingScreen();
  await preLoadPokemonAPIData();
  overwriteLoadingCompleted(true);
  renderPokemonCards();
  getSuggestions();
}
loadAndRenderPokemonCards();
