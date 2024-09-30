import { pokemonStart, pokemonEnd, labels } from "./globals.js";
import { getPokemonData, getPokemonFlavorText, getPokemonGeneraText, getPokemonNamesText } from "./pokeapiData.js";
import { renderPokemonCardTemplate } from "./templates.js";

export async function getPokemonDataArrays() {
  const pokemonDataArray = await getPokemonData();
  const pokemonFlavorTextArray = await getPokemonFlavorText();
  const pokemonGeneraTextArray = await getPokemonGeneraText(); // https://www.scaler.com/topics/javascript-return-multiple-values/
  const pokemonNamesTextArray = await getPokemonNamesText(); // https://stackoverflow.com/questions/5760058/how-to-return-multiple-arrays-from-a-function-in-javascript
  return { pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray };
}

export async function renderPokemonCards() {
  if (document.getElementById("contentCards") == null) createContentCards();
  let contentCardsRef = document.getElementById("contentCards");
  contentCardsRef.innerHTML = "";
  const { pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray } = await getPokemonDataArrays();
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
