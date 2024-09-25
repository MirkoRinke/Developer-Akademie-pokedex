import { userNameInputRef, pokemonLimit, loadingCompleted } from "./globals.js";

export function getUserName() {
  if (!loadingCompleted) return;
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
    let char = userName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  let index = Math.abs(hash) % pokemonArray.length; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
  return showPokemonDetails(index);
}
