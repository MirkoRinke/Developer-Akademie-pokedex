import { pokemonEnd } from "./globals.js";
import { renderShowLoadingScreen } from "./templates.js";

export function showLoadingScreen() {
  const contentRef = document.getElementById("contentCards");
  contentRef.innerHTML = "";
  for (let index = 1; index < pokemonEnd; index++) {
    contentRef.innerHTML += renderShowLoadingScreen();
  }
}
