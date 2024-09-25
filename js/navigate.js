import { pokemonStart, pokemonEnd, pokemonLimit, bigCardOpen, loadingCompleted } from "./globals.js";
import { renderPokemonCards } from "./cards.js";

export function backToHome() {
  if (!loadingCompleted) return;
  overwritePokemonStart(1);
  overwritePokemonEnd(11);
  renderPokemonCards();
}

export function forward() {
  if (!loadingCompleted) return;
  if (pokemonEnd >= pokemonLimit) {
    overwritePokemonStart(1);
    overwritePokemonEnd(11);
  } else if (pokemonEnd + 10 > pokemonLimit) {
    overwritePokemonStart(pokemonStart + 10);
    overwritePokemonEnd(pokemonLimit);
  } else {
    overwritePokemonStart(pokemonStart + 10);
    overwritePokemonEnd(pokemonEnd + 10);
  }
  renderPokemonCards();
}

export function backward() {
  if (!loadingCompleted) return;
  if (pokemonStart <= 1) {
    overwritePokemonStart(Math.floor(pokemonLimit / 10) * 10 + 1);
    overwritePokemonEnd(pokemonLimit);
  } else if (pokemonStart - 10 < 1) {
    overwritePokemonEnd(pokemonStart - 1);
    overwritePokemonStart(1);
  } else {
    overwritePokemonStart(pokemonStart - 10);
    if (pokemonEnd === pokemonLimit) {
      overwritePokemonEnd(pokemonStart + 10);
    } else {
      overwritePokemonEnd(pokemonEnd - 10);
    }
  }
  renderPokemonCards();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight" && loadingCompleted) {
    !bigCardOpen ? forward() : document.getElementById("pokeArrowRight").click();
  } else if (event.key === "ArrowLeft") {
    !bigCardOpen ? backward() : document.getElementById("pokeArrowLeft").click();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !bigCardOpen && loadingCompleted) {
    const activeElement = document.activeElement;
    if (activeElement) activeElement.click();
  }
});
