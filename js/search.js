import { searchSuggestions, pokemonDataCache, pokemonLimit, labels, loadingCompleted } from "./globals.js";
import { getPokemonData, getPokemonFlavorText, getPokemonGeneraText, getPokemonNamesText } from "./pokeapiData.js";
import { renderPokemonCards } from "./cards.js";
import { renderPokemonCardTemplate } from "./templates.js";
import { navButtonsShow } from "./navigate.js";

function pokemonSearchInput() {
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (!loadingCompleted) return;
  if (pokemonSearchInputRef.value.length >= 3) {
    searchPokemonByName(pokemonSearchInputRef.value);
  } else {
    renderPokemonCards();
    navButtonsShow();
  }
}

document.addEventListener("input", function () {
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (document.activeElement === pokemonSearchInputRef) {
    pokemonSearchInput();
  }
});

async function searchPokemonByName(search) {
  let selectedPokemonIDs = [];
  if (pokemonDataCache.length === 0) await preLoadPokemonAPIData();
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    if (pokemonDataCache[IndexPokeID]) {
      let PokeNameEng = pokemonDataCache[IndexPokeID].species.names[8].name;
      let PokeNameGer = pokemonDataCache[IndexPokeID].species.names[5].name;
      let PokeNameJa = pokemonDataCache[IndexPokeID].species.names[9].name;
      if (
        PokeNameEng.toLowerCase().includes(search.toLowerCase()) ||
        PokeNameGer.toLowerCase().includes(search.toLowerCase()) ||
        PokeNameJa.toLowerCase().includes(search.toLowerCase())
      ) {
        selectedPokemonIDs.push(IndexPokeID);
      }
    }
  }
  renderSelectedPokemonCards(selectedPokemonIDs);
}

async function renderSelectedPokemonCards(selectedPokemonIDs) {
  selectedPokemonIDs.length = 10;
  const contentRef = document.getElementById("contentCards");
  contentRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  for (let pokeID of selectedPokemonIDs) {
    if (pokeID >= 1) {
      contentRef.innerHTML += renderPokemonCardTemplate(
        pokemonDataArray[pokeID - 1],
        pokemonFlavorTextArray[pokeID - 1],
        pokemonGeneraTextArray[pokeID - 1],
        pokemonNamesTextArray[pokeID - 1],
        labels
      );
    }
  }
}

//! Search Suggestions
export async function getSuggestions() {
  if (pokemonDataCache.length === 0) await preLoadPokemonAPIData();
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    if (pokemonDataCache[IndexPokeID]) {
      let PokeNameEng = pokemonDataCache[IndexPokeID].species.names[8].name;
      let PokeNameGer = pokemonDataCache[IndexPokeID].species.names[5].name;
      let PokeNameJa = pokemonDataCache[IndexPokeID].species.names[9].name;
      if (!searchSuggestions.includes(PokeNameEng)) searchSuggestions.push(PokeNameEng);
      if (!searchSuggestions.includes(PokeNameGer)) searchSuggestions.push(PokeNameGer);
      if (!searchSuggestions.includes(PokeNameJa)) searchSuggestions.push(PokeNameJa);
    }
  }
}

document.addEventListener("input", function () {
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  if (document.activeElement === pokemonSearchInputRef) {
    const query = pokemonSearchInputRef.value.toLowerCase();
    searchSuggestionsRef.innerHTML = "";
    searchSuggestionsRef.classList.add("d_none");
    if (pokemonSearchInputRef.value.length < 3) return;
    showSearchSuggestions(query);
  }
});

function showSearchSuggestions(query) {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  if (query) {
    const filteredSuggestions = searchSuggestions.filter(function (item) {
      return item.toLowerCase().includes(query);
    });
    for (let index = 0; index < filteredSuggestions.length; index++) {
      searchSuggestionsRef.classList.remove("d_none");
      searchSuggestionsRef.innerHTML += /*html*/ `
          <div class="suggestion" onclick="clickSuggestions('${filteredSuggestions[index]}');">${filteredSuggestions[index]}</div>
        `;
    }
  }
}

export function clickSuggestions(filteredSuggestions) {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  pokemonSearchInputRef.value = filteredSuggestions;
  searchSuggestionsRef.classList.add("d_none");
  pokemonSearchInput();
}

document.addEventListener("keydown", function (event) {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (document.activeElement === pokemonSearchInputRef) {
    if (event.key === "Enter") searchSuggestionsRef.classList.add("d_none");
  }
});

// https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
document.addEventListener("blur", function () {
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (document.activeElement === pokemonSearchInputRef) {
    setTimeout(function () {
      searchSuggestionsRef.classList.add("d_none");
    }, 300);
  }
});
