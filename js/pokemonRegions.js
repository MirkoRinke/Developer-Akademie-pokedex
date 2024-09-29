import { pokemonRegionsRef, currentLanguage } from "./globals.js";
import { renderPokemonRegionsTemplate } from "./templates.js";

export function renderPokemonRegions() {
  pokemonRegionsRef.innerHTML = renderPokemonRegionsTemplate(currentLanguage);
}
