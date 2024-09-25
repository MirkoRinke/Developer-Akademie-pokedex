import {
  contentBigCardRef,
  pokeArrowLeftContainerRef,
  pokeArrowRightContainerRef,
  pokeArrowMobileButtonsLeftRef,
  pokeArrowMobileButtonsRightRef,
  cardRef,
  pokemonCardRef,
  containerRef,
  pokemonLimit,
  bigCardOpen,
  labels,
} from "./globals.js";
import { getPokemonData, getPokemonFlavorText, getPokemonGeneraText, getPokemonNamesText } from "./pokeapiData.js";
import { renderPokemonBigCardTemplate } from "./templates.js";

export function showPokemonDetails(IndexPokeID) {
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
  overwriteBigCardOpen(true);
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
  overwriteBigCardOpen(false);
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
  if (event.key === "Escape" && bigCardOpen) toggleBigCard();
});

export async function renderPokemonDetails(IndexPokeID) {
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
