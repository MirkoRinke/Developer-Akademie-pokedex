import { pokemonLimit, loadingCompleted } from "./globals.js";

export function getUserName() {
  if (!loadingCompleted) return;
  const userNameInputRef = document.getElementById("userNameInput");
  let userName = userNameInputRef.value;
  setTimeout(() => (userNameInputRef.value = ""), 300);
  return nameToPokemon(userName);
}

document.addEventListener("keydown", function (event) {
  const userNameInputRef = document.getElementById("userNameInput");
  if (document.activeElement === userNameInputRef) {
    if (event.key === "Enter") getUserName();
  }
});

// https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript
function nameToPokemon(userName) {
  if (userName == "") return;
  let hash = 0;
  let pokemonArray = [];
  for (let i = 1; i < pokemonLimit; i++) pokemonArray.push(i);
  userName = userName.toLowerCase();
  for (let i = 0; i < userName.length; i++) {
    let char = userName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  let index = Math.abs(hash) % pokemonArray.length; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
  if (hash == 102355 || hash == 1272019794) index = 144;
  return showPokemonDetails(index);
}
