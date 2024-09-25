export const P = new Pokedex.Pokedex();
export const contentBigCardRef = document.getElementById("contentBigCard");
export const pokeArrowLeftContainerRef = document.getElementById("pokeArrowLeftContainer");
export const pokeArrowRightContainerRef = document.getElementById("pokeArrowRightContainer");
export const pokeArrowMobileButtonsLeftRef = document.getElementById("pokeArrowMobileButtonsLeft");
export const pokeArrowMobileButtonsRightRef = document.getElementById("pokeArrowMobileButtonsRight");
export const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
export const searchSuggestionsRef = document.getElementById("searchSuggestions");
export const cardRef = document.getElementsByClassName("card");
export const pokemonCardRef = document.getElementsByClassName("pokemonCard");
export const containerRef = document.getElementsByClassName("container");
export const languageSettingsJa = document.getElementById("languageSettingsJa");
export const languageSettingsEn = document.getElementById("languageSettingsEn");
export const languageSettingsDe = document.getElementById("languageSettingsDe");
export const userNameInputRef = document.getElementById("userNameInput");

export let searchSuggestions = [];
export let pokemonDataCache = [];
export let pokemonLimit = 152; // 152 , 1026

export let pokemonStart = 1; // Start
window.overwritePokemonStart = overwritePokemonStart;
function overwritePokemonStart(overwrite) {
  pokemonStart = overwrite;
}

export let pokemonEnd = 11; // Ende
window.overwritePokemonEnd = overwritePokemonEnd;
function overwritePokemonEnd(overwrite) {
  pokemonEnd = overwrite;
}

export let currentLanguage = "de";
window.overwriteCurrentLanguage = overwriteCurrentLanguage;
function overwriteCurrentLanguage(overwrite) {
  currentLanguage = overwrite;
}

export let labels = {};
window.overwriteLabels = overwriteLabels;
function overwriteLabels(overwrite) {
  labels = overwrite;
}

export let bigCardOpen = false;
window.overwriteBigCardOpen = overwriteBigCardOpen;
function overwriteBigCardOpen(overwrite) {
  bigCardOpen = overwrite;
}

export let loadingCompleted = false;
window.overwriteLoadingCompleted = overwriteLoadingCompleted;
function overwriteLoadingCompleted(overwrite) {
  loadingCompleted = overwrite;
}
