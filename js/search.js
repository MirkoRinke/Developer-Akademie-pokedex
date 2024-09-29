import { pokemonSearchInputRef, searchSuggestionsRef, searchSuggestions, pokemonDataCache, pokemonLimit, labels, loadingCompleted } from "./globals.js";
import { getPokemonData, getPokemonFlavorText, getPokemonGeneraText, getPokemonNamesText } from "./pokeapiData.js";
import { renderPokemonCards } from "./cards.js";
import { renderPokemonCardTemplate } from "./templates.js";
import { navButtonsShow } from "./navigate.js";

function pokemonSearchInput() {
  if (!loadingCompleted) return;
  if (pokemonSearchInputRef.value.length >= 3) {
    searchPokemonByName(pokemonSearchInputRef.value);
  } else {
    renderPokemonCards();
    navButtonsShow();
  }
}

pokemonSearchInputRef.addEventListener("input", function () {
  pokemonSearchInput();
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

pokemonSearchInputRef.addEventListener("input", function () {
  const query = pokemonSearchInputRef.value.toLowerCase();
  searchSuggestionsRef.innerHTML = "";
  searchSuggestionsRef.classList.add("d_none");
  if (pokemonSearchInputRef.value.length < 3) return;
  showSearchSuggestions(query);
});

function showSearchSuggestions(query) {
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
  pokemonSearchInputRef.value = filteredSuggestions;
  searchSuggestionsRef.classList.add("d_none");
  pokemonSearchInput();
}

pokemonSearchInputRef.addEventListener("keydown", function (event) {
  if (event.key === "Enter") searchSuggestionsRef.classList.add("d_none");
});

// https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
pokemonSearchInputRef.addEventListener("blur", function () {
  setTimeout(function () {
    searchSuggestionsRef.classList.add("d_none");
  }, 300);
});
