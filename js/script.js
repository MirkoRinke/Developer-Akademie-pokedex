const P = new Pokedex.Pokedex();
const debouncedForward = debounce(forward, 1000);
const debouncedBackward = debounce(backward, 1000);
const contentBigCardRef = document.getElementById("contentBigCard");
const pokeArrowLeftContainerRef = document.getElementById("pokeArrowLeftContainer");
const pokeArrowRightContainerRef = document.getElementById("pokeArrowRightContainer");
const pokeArrowMobileButtonsLeftRef = document.getElementById("pokeArrowMobileButtonsLeft");
const pokeArrowMobileButtonsRightRef = document.getElementById("pokeArrowMobileButtonsRight");
const contentBigCardContainerRef = document.getElementById("contentBigCardContainer");
const bodyRef = document.getElementById("body");
const pokemonSearchInputRef = document.getElementById("pokemonSearchInput");
const searchSuggestionsRef = document.getElementById("searchSuggestions");
const cardRef = document.getElementsByClassName("card");
const pokemonCardRef = document.getElementsByClassName("pokemonCard");
const containerRef = document.getElementsByClassName("container");
const languageSettingsJa = document.getElementById("languageSettingsJa");
const languageSettingsEn = document.getElementById("languageSettingsEn");
const languageSettingsDe = document.getElementById("languageSettingsDe");
const userNameInputRef = document.getElementById("userNameInput");
let searchSuggestions = [];
let pokemonDataCache = []; // Cache
let pokemonStart = 1; // Start
let pokemonEnd = 11; // Ende
let pokemonLimit = 152; // Max 152 , 1026
let currentLanguage = "de";
let bigCardOpen = false;
let labels = {};

// console.log(P.getPokemonSpeciesByName(1));

function customTranslations() {
  const translations = {
    en: {
      size: "Size",
      weight: "Weight",
      description: "A big thanks to Ditto for the excellent modeling work.",
    },
    de: {
      size: "Größe",
      weight: "Gewicht",
      description: "Ein großer Dank an Ditto für die hervorragende Modellarbeit.",
    },
    ja: {
      size: "サイズ",
      weight: "重さ",
      description: "モデリングに優れた仕事をしたメタモンに感謝します。",
    },
  };
  labels = translations[currentLanguage];
}
customTranslations();

//! Selected Language
function selectedLanguage(selected) {
  currentLanguage = selected;
  customTranslations();
  renderPokemonCards();
  getSelectedLanguage();
}

function getSelectedLanguage() {
  languageSettingsJa.style.border = "";
  languageSettingsEn.style.border = "";
  languageSettingsDe.style.border = "";
  if (currentLanguage == "ja") languageSettingsJa.style.border = "3px solid rgb(182, 152, 55)";
  if (currentLanguage == "en") languageSettingsEn.style.border = "3px solid rgb(182, 152, 55)";
  if (currentLanguage == "de") languageSettingsDe.style.border = "3px solid rgb(182, 152, 55)";
}
getSelectedLanguage();

//! backToHome
function backToHome() {
  pokemonStart = 1;
  pokemonEnd = 11;
  renderPokemonCards();
}

//! General Page Buttons and EventListener
// https://dev.to/jeetvora331/javascript-debounce-easiest-explanation--29hc
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function forward() {
  if (pokemonEnd >= pokemonLimit) {
    pokemonStart = 1;
    pokemonEnd = 11;
  } else if (pokemonEnd + 10 > pokemonLimit) {
    pokemonStart += 10;
    pokemonEnd = pokemonLimit;
  } else {
    pokemonStart += 10;
    pokemonEnd += 10;
  }
  renderPokemonCards();
}

function backward() {
  if (pokemonStart <= 1) {
    pokemonStart = Math.floor(pokemonLimit / 10) * 10 + 1;
    pokemonEnd = pokemonLimit;
  } else if (pokemonStart - 10 < 1) {
    pokemonEnd = pokemonStart - 1;
    pokemonStart = 1;
  } else {
    pokemonStart -= 10;
    if (pokemonEnd === pokemonLimit) {
      pokemonEnd = pokemonStart + 10;
    } else {
      pokemonEnd -= 10;
    }
  }
  renderPokemonCards();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    !bigCardOpen ? debouncedForward() : document.getElementById("pokeArrowRight").click();
  } else if (event.key === "ArrowLeft") {
    !bigCardOpen ? debouncedBackward() : document.getElementById("pokeArrowLeft").click();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !bigCardOpen) {
    const activeElement = document.activeElement;
    if (activeElement) activeElement.click();
  }
});

//!  preLoadPokemonAPIData
async function preLoadPokemonAPIData() {
  const promises = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const pokemonData = P.getPokemonByName(IndexPokeID);
    const pokemonSpecies = P.getPokemonSpeciesByName(IndexPokeID);
    promises.push(
      Promise.all([pokemonData, pokemonSpecies]).then(([data, species]) => {
        pokemonDataCache[IndexPokeID] = {
          data,
          species,
        };
      })
    );
  }
  await Promise.all(promises);
}

//! render PokemonCards after preLoad
async function loadAndRenderPokemonCards() {
  showLoadingScreen();
  await preLoadPokemonAPIData();
  renderPokemonCards();
  getSuggestions();
}
loadAndRenderPokemonCards();

//! Loading screen
function showLoadingScreen() {
  const contentRef = document.getElementById("contentCards");
  contentRef.innerHTML = "";
  for (let index = 1; index < pokemonEnd; index++) {
    contentRef.innerHTML += renderShowLoadingScreen();
  }
}

//! Get Pokemon Data
async function getPokemonData() {
  const pokemonDataArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    pokemonDataArray.push(pokemonDataCache[IndexPokeID].data);
  }
  return pokemonDataArray;
}

//! render Pokemon Cards
async function renderPokemonCards() {
  const contentRef = document.getElementById("contentCards");
  contentRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonEnd; IndexPokeID++) {
    contentRef.innerHTML += renderPokemonCardTemplate(
      pokemonDataArray[IndexPokeID - 1],
      pokemonFlavorTextArray[IndexPokeID - 1],
      pokemonGeneraTextArray[IndexPokeID - 1],
      pokemonNamesTextArray[IndexPokeID - 1],
      labels
    );
  }
}

//! FlavorText
async function getPokemonFlavorText() {
  const flavorTextArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeFlavorText = "";
    for (let indexFlavorText = 0; indexFlavorText < speciesData.flavor_text_entries.length; indexFlavorText++) {
      if (speciesData.flavor_text_entries[indexFlavorText].language.name === currentLanguage) {
        pokeFlavorText = speciesData.flavor_text_entries[indexFlavorText].flavor_text;
        break;
      }
    }
    flavorTextArray.push(pokeFlavorText);
  }
  return flavorTextArray;
}

//! GeneraText
async function getPokemonGeneraText() {
  const generaTextArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeGenera = "";
    for (let indexGenera = 0; indexGenera < speciesData.genera.length; indexGenera++) {
      if (speciesData.genera[indexGenera].language.name === currentLanguage) {
        pokeGenera = speciesData.genera[indexGenera].genus;
        break;
      }
    }
    generaTextArray.push(pokeGenera);
  }
  return generaTextArray;
}

//! PokemonNames
async function getPokemonNamesText() {
  const namesTextArray = [];
  for (let IndexPokeID = 1; IndexPokeID < pokemonLimit; IndexPokeID++) {
    const speciesData = pokemonDataCache[IndexPokeID].species;
    let pokeName = "";
    for (let indexNames = 0; indexNames < speciesData.names.length; indexNames++) {
      if (speciesData.names[indexNames].language.name === currentLanguage) {
        pokeName = speciesData.names[indexNames].name;
        break;
      }
    }
    namesTextArray.push(pokeName);
  }
  return namesTextArray;
}

//! Pokemon Details Big Card
function showPokemonDetails(IndexPokeID) {
  contentBigCardRef.classList.toggle("d_none");
  pokeArrowLeftContainerRef.classList.toggle("d_none");
  pokeArrowRightContainerRef.classList.toggle("d_none");
  pokeArrowMobileButtonsLeftRef.classList.toggle("d_none");
  pokeArrowMobileButtonsRightRef.classList.toggle("d_none");
  for (let i = 0; i < cardRef.length; i++) {
    cardRef[i].classList.toggle("backsideCard");
    containerRef[i].classList.toggle("transformOff");
    pokemonCardRef[i].classList.toggle("d_none");
  }
  bigCardOpen = true;
  renderPokemonDetails(IndexPokeID);
}

function toggleBigCard() {
  contentBigCardRef.classList.toggle("d_none");
  pokeArrowLeftContainerRef.classList.toggle("d_none");
  pokeArrowRightContainerRef.classList.toggle("d_none");
  pokeArrowMobileButtonsLeftRef.classList.toggle("d_none");
  pokeArrowMobileButtonsRightRef.classList.toggle("d_none");
  for (let i = 0; i < cardRef.length; i++) {
    cardRef[i].classList.toggle("backsideCard");
    containerRef[i].classList.toggle("transformOff");
    setTimeout(() => {
      pokemonCardRef[i].classList.toggle("d_none");
    }, 200);
  }
  bigCardOpen = !bigCardOpen;
}

// https://alvarotrigo.com/blog/prevent-scroll-on-scrollable-element-js/
document.querySelector("#contentBigCard").addEventListener("wheel", preventScroll, { passive: false });
function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

contentBigCardRef.addEventListener("click", function (event) {
  if (event.target === contentBigCardRef) toggleBigCard();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") toggleBigCard();
});

async function renderPokemonDetails(IndexPokeID) {
  if (IndexPokeID < 1) {
    IndexPokeID = pokemonLimit - 1;
  } else if (IndexPokeID >= pokemonLimit) {
    IndexPokeID = 1;
  }
  contentBigCardRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  contentBigCardRef.innerHTML = renderPokemonBigCardTemplate(
    pokemonDataArray[IndexPokeID - 1],
    pokemonFlavorTextArray[IndexPokeID - 1],
    pokemonGeneraTextArray[IndexPokeID - 1],
    pokemonNamesTextArray[IndexPokeID - 1],
    IndexPokeID,
    labels
  );
}

//! Pokemon Search Input
function pokemonSearchInput() {
  if (pokemonSearchInputRef.value.length >= 3) {
    searchPokemonByName(pokemonSearchInputRef.value);
  } else {
    renderPokemonCards();
  }
}

pokemonSearchInputRef.addEventListener("input", function () {
  pokemonSearchInput();
});

//! Pokemon Search Funktion "searchPokemonByName("pik")"
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

//! render Search Pokemon
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
async function getSuggestions() {
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

function clickSuggestions(filteredSuggestions) {
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

//! Your name your Pokemon
function getUserName() {
  let userName = userNameInputRef.value;
  setTimeout(() => {
    userNameInputRef.value = "";
  }, 300);
  return nameToPokemon(userName);
}

userNameInputRef.addEventListener("keydown", function (event) {
  if (event.key === "Enter") getUserName();
});

// https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript
function nameToPokemon(userName) {
  if (userName == "") return;
  let hash = 0;
  let pokemonArray = [];
  for (let i = 1; i < pokemonLimit; i++) pokemonArray.push(i);
  for (let i = 0; i < userName.length; i++) {
    char = userName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  let index = Math.abs(hash) % pokemonArray.length; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
  return showPokemonDetails(index);
}
