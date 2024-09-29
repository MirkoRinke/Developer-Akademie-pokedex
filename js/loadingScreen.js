import { renderShowLoadingScreen } from "./templates.js";
import { createContentCards } from "./cards.js";

export function showLoadingScreen() {
  let contentCardsRef = document.getElementById("contentCards");
  if (contentCardsRef == null) {
    createContentCards();
    contentCardsRef = document.getElementById("contentCards");
  }
  contentCardsRef.innerHTML = "";
  for (let index = 1; index < 11; index++) {
    contentCardsRef.innerHTML += renderShowLoadingScreen();
  }
}
