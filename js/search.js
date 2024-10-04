import { searchSuggestions, pokemonDataCache, labels, loadingCompleted } from "./globals.js";
import { renderPokemonCards, getPokemonDataArrays } from "./cards.js";
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

export function pokemonSearchButton() {
  if (!loadingCompleted) return;
  const searchSuggestionsRef = document.getElementById("searchSuggestions");
  searchSuggestionsRef.classList.add("d_none");
  pokemonSearchInput();
}

document.addEventListener("input", function () {
  const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
  if (document.activeElement === pokemonSearchInputRef) pokemonSearchInput();
});

async function searchPokemonByName(search) {
  if (pokemonDataCache.length === 0) await preLoadPokemonAPIData();
  const selectedPokemonIDs = [];
  const searchLower = search.toLowerCase();
  pokemonDataCache.forEach((pokemon, IndexPokeID) => {
    if (pokemon) {
      const pokemonNames = [pokemon.species.names[8].name, pokemon.species.names[5].name, pokemon.species.names[9].name];
      if (pokemonNames.some((name) => name.toLowerCase().includes(searchLower))) selectedPokemonIDs.push(IndexPokeID); // https://www.w3schools.com/jsref/jsref_some.asp
    }
  });
  renderSelectedPokemonCards(selectedPokemonIDs);
}

async function renderSelectedPokemonCards(selectedPokemonIDs) {
  selectedPokemonIDs.length = 10;
  const contentRef = document.getElementById("contentCards"); // https://www.w3schools.com/js/js_destructuring.asp
  contentRef.innerHTML = "";
  const { pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray } = await getPokemonDataArrays();
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
  pokemonDataCache.forEach((pokemon) => {
    if (!pokemon) return;
    const pokemonNames = [pokemon.species.names[8].name, pokemon.species.names[5].name, pokemon.species.names[9].name];
    pokemonNames.forEach((name) => {
      if (!searchSuggestions.includes(name)) searchSuggestions.push(name);
    });
  });
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
    const filteredSuggestions = searchSuggestions.filter((pokemon) => pokemon.toLowerCase().startsWith(query.toLowerCase()));
    searchSuggestionsRef.classList.remove("d_none");
    if (filteredSuggestions.length === 0) searchSuggestionsRef.classList.add("d_none");
    searchSuggestionsRef.innerHTML = "";
    filteredSuggestions.forEach((pokemon, index) => {
      searchSuggestionsRef.innerHTML += /*html*/ `
        <div tabindex="${index + 102}" class="suggestion" onclick="clickSuggestions('${pokemon}');">${pokemon}</div>
      `;
    });
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
