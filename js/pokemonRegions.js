import { pokemonRegionsRef, currentLanguage, RegionsMenuOpen, contentRef, navRef } from "./globals.js";
import { renderPokemonRegionsNavTemplate } from "./templates.js";

export function renderPokemonRegions() {
  pokemonRegionsRef.innerHTML = renderPokemonRegionsNavTemplate(currentLanguage);
}

export function toggleRegionsMenu() {
  const selectedPokemonRegionsRef = document.getElementById("selectedPokemonRegions");
  if (!RegionsMenuOpen) selectedPokemonRegionsRef.classList.toggle("d_none");
  setTimeout(() => {
    selectedPokemonRegionsRef.classList.toggle("transformIn");
    if (!RegionsMenuOpen) {
      setTimeout(() => {
        selectedPokemonRegionsRef.classList.toggle("d_none");
      }, 1000);
    }
  }, 10);
  overwriteRegionsMenuOpen(!RegionsMenuOpen);
}

export function selectedPokemonLimit(selectedPokemonStart, selectedPokemonEnd, selectedPokemonLimit) {
  overwritePokemonLimit(selectedPokemonLimit);
  overwritePokemonStart(selectedPokemonStart);
  overwritePokemonEnd(selectedPokemonEnd);
  toggleRegionsMenu();
  setTimeout(() => {
    loadAndRenderPokemonCards();
  }, 1000);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && RegionsMenuOpen) toggleRegionsMenu();
});

document.addEventListener("click", function (event) {
  if ((event.target === contentRef && RegionsMenuOpen) || (event.target === navRef && RegionsMenuOpen)) toggleRegionsMenu();
});
