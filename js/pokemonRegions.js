import { RegionsMenuOpen, contentRef, navRef, pokemonLimit } from "./globals.js";
import { renderPokemonCards } from "./cards.js";

export function toggleRegionsMenu() {
  const selectedPokemonRegionsRef = document.getElementById("selectedPokemonRegions");
  if (!RegionsMenuOpen) selectedPokemonRegionsRef.classList.toggle("d_none");
  setTimeout(() => {
    selectedPokemonRegionsRef.classList.toggle("transformIn");
    if (!RegionsMenuOpen) setTimeout(() => selectedPokemonRegionsRef.classList.toggle("d_none"), 1000);
  }, 10);
  overwriteRegionsMenuOpen(!RegionsMenuOpen);
}

export function selectedPokemonLimit(selectedPokemonStart, selectedPokemonEnd, selectedPokemonLimit) {
  overwritePokemonStart(selectedPokemonStart);
  overwritePokemonEnd(selectedPokemonEnd);
  toggleRegionsMenu();
  if (selectedPokemonLimit > pokemonLimit) {
    overwritePokemonLimit(selectedPokemonLimit);
    setTimeout(() => loadAndRenderPokemonCards(), 1000);
  } else {
    renderPokemonCards();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && RegionsMenuOpen) toggleRegionsMenu();
});

document.addEventListener("click", function (event) {
  if ((event.target === contentRef && RegionsMenuOpen) || (event.target === navRef && RegionsMenuOpen)) toggleRegionsMenu();
});
