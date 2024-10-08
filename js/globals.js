const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 3000, // 15s
  cacheImages: true,
};
export const P = new Pokedex.Pokedex(customOptions);
export const contentBigCardRef = document.getElementById("contentBigCard");
export const contentRef = document.getElementById("content");
export const pokeArrowLeftContainerRef = document.getElementById("pokeArrowLeftContainer");
export const pokeArrowRightContainerRef = document.getElementById("pokeArrowRightContainer");
export const pokeArrowMobileButtonsLeftRef = document.getElementById("pokeArrowMobileButtonsLeft");
export const pokeArrowMobileButtonsRightRef = document.getElementById("pokeArrowMobileButtonsRight");
export const navRef = document.getElementById("nav");
export const cardRef = document.getElementsByClassName("card");
export const pokemonCardRef = document.getElementsByClassName("pokemonCard");
export const containerRef = document.getElementsByClassName("container");
export const languageSettingsJa = document.getElementById("languageSettingsJa");
export const languageSettingsEn = document.getElementById("languageSettingsEn");
export const languageSettingsDe = document.getElementById("languageSettingsDe");
export const footerRef = document.getElementById("footer");
export const soundGiulianoSong = new Audio("./assets/sounds/giuliano_song.mp3");
export let searchSuggestions = [];
export let pokemonDataCache = [];

export let pokemonLimit = 152; // 152 , 1026
window.overwritePokemonLimit = overwritePokemonLimit;
function overwritePokemonLimit(overwrite) {
  pokemonLimit = overwrite;
}

export let pokemonStart = 1;
window.overwritePokemonStart = overwritePokemonStart;
function overwritePokemonStart(overwrite) {
  pokemonStart = overwrite;
}

export let pokemonEnd = 11;
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

export let RegionsMenuOpen = false;
window.overwriteRegionsMenuOpen = overwriteRegionsMenuOpen;
function overwriteRegionsMenuOpen(overwrite) {
  RegionsMenuOpen = overwrite;
}
