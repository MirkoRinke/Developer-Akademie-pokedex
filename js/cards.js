import { pokemonStart, pokemonEnd, labels } from "./globals.js";
import { getPokemonData, getPokemonFlavorText, getPokemonGeneraText, getPokemonNamesText } from "./pokeapiData.js";
import { renderPokemonCardTemplate } from "./templates.js";

export async function renderPokemonCards() {
  let contentCardsRef = document.getElementById("contentCards");
  if (contentCardsRef == null) {
    createContentCards();
    contentCardsRef = document.getElementById("contentCards");
  }
  contentCardsRef.innerHTML = "";
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText();
  const pokemonNamesTextArray = await getPokemonNamesText();
  for (let IndexPokeID = pokemonStart; IndexPokeID < pokemonEnd; IndexPokeID++) {
    contentCardsRef.innerHTML += renderPokemonCardTemplate(
      pokemonDataArray[IndexPokeID - 1],
      pokemonFlavorTextArray[IndexPokeID - 1],
      pokemonGeneraTextArray[IndexPokeID - 1],
      pokemonNamesTextArray[IndexPokeID - 1],
      labels
    );
  }
}

export function createContentCards() {
  const contentCardsRef = document.getElementById("content");
  contentCardsRef.innerHTML = /*html*/ `
    <section class="contentCards" id="contentCards"></section>
  `;
}
