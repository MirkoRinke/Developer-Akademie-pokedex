import {
  pokemonStart,
  pokemonEnd,
  pokemonLimit,
  bigCardOpen,
  loadingCompleted,
  pokeArrowLeftContainerRef,
  pokeArrowRightContainerRef,
  pokeArrowMobileButtonsLeftRef,
  pokeArrowMobileButtonsRightRef,
  navRef,
} from "./globals.js";

import { renderPokemonCards } from "./cards.js";

export function backToHome() {
  if (!loadingCompleted) return;
  overwritePokemonStart(1);
  overwritePokemonEnd(11);
  renderPokemonCards();
  navButtonsShow();
  menuButtonsShow();
}

export function navButtonsShow() {
  pokeArrowLeftContainerRef.classList.remove("d_none");
  pokeArrowRightContainerRef.classList.remove("d_none");
  pokeArrowMobileButtonsLeftRef.classList.remove("d_none");
  pokeArrowMobileButtonsRightRef.classList.remove("d_none");
}

export function navButtonsHide() {
  pokeArrowLeftContainerRef.classList.add("d_none");
  pokeArrowRightContainerRef.classList.add("d_none");
  pokeArrowMobileButtonsLeftRef.classList.add("d_none");
  pokeArrowMobileButtonsRightRef.classList.add("d_none");
}

function getMenuRefs() {
  return {
    searchRef: document.getElementById("search"),
    pokemonRegionsRef: document.getElementById("pokemonRegions"),
    yourNameRef: document.getElementById("yourName"),
    languageSettingsRef: document.getElementById("languageSettings"),
  };
}

export function menuButtonsShow() {
  const { searchRef, pokemonRegionsRef, yourNameRef, languageSettingsRef } = getMenuRefs();
  searchRef.classList.remove("d_none");
  pokemonRegionsRef.classList.remove("d_none");
  yourNameRef.classList.remove("d_none");
  languageSettingsRef.classList.remove("d_none");
  navRef.classList.remove("menuGridTemplateColumns");
}

export function menuButtonsHide() {
  const { searchRef, pokemonRegionsRef, yourNameRef, languageSettingsRef } = getMenuRefs();
  searchRef.classList.add("d_none");
  pokemonRegionsRef.classList.add("d_none");
  yourNameRef.classList.add("d_none");
  languageSettingsRef.classList.add("d_none");
  navRef.classList.add("menuGridTemplateColumns");
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
