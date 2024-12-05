/**
 * @fileoverview This module handles the display and interaction of the big card component in the Pokémon application.
 * It imports necessary references, constants, and functions from various modules to manage the big card's content,
 * rendering, navigation, and data retrieval. The main functionality includes displaying the details of a selected Pokémon,
 * playing its cry sound, and toggling the visibility of the big card content.
 */

/**
 * Importing various references and constants from the globals.js module.
 *
 * @module globals
 * @property {Object} contentBigCardRef - Reference to the content of the big card.
 * @property {Object} cardRef - Reference to the card element.
 * @property {Object} pokemonCardRef - Reference to the Pokémon card element.
 * @property {Object} containerRef - Reference to the container element.
 * @property {number} pokemonLimit - Limit for the number of Pokémon.
 * @property {boolean} bigCardOpen - Flag indicating if the big card is open.
 * @property {Array} labels - Array of labels.
 * @property {Object} soundGiulianoSong - Reference to the Giuliano song sound object.
 * @property {Object} pokemonDataCache - Cache for Pokémon data.
 */
import { contentBigCardRef, cardRef, pokemonCardRef, containerRef, pokemonLimit, bigCardOpen, labels, soundGiulianoSong, pokemonDataCache } from "./globals.js";

/**
 * Importing the renderPokemonBigCardTemplate function from the templates.js module.
 *
 * @module templates
 * @function renderPokemonBigCardTemplate - Function to render the Pokémon big card template.
 */
import { renderPokemonBigCardTemplate } from "./templates.js";

/**
 * Importing the navButtonsShow and navButtonsHide functions from the navigate.js module.
 *
 * @module navigate
 * @function navButtonsShow - Function to show navigation buttons.
 * @function navButtonsHide - Function to hide navigation buttons.
 */
import { navButtonsShow, navButtonsHide } from "./navigate.js";

/**
 * Importing the getPokemonDataArrays function from the cards.js module.
 *
 * @module cards
 * @function getPokemonDataArrays - Function to get arrays of Pokémon data.
 */
import { getPokemonDataArrays } from "./cards.js";

/**
 * Displays the details of a selected Pokémon.
 *
 * This function performs the following actions:
 * - Plays the cry sound of the selected Pokémon.
 * - Toggles the visibility of the big card content.
 * - Hides navigation buttons.
 * - Toggles the backside and transformation states of all Pokémon cards.
 * - Sets the state indicating that the big card is open.
 * - Renders the detailed information of the selected Pokémon.
 *
 * @param {number} IndexPokeID - The index or ID of the Pokémon to display details for.
 */
export function showPokemonDetails(IndexPokeID) {
  playCries(IndexPokeID);
  contentBigCardRef.classList.toggle("d_none");
  navButtonsHide();
  for (let i = 0; i < cardRef.length; i++) {
    cardRef[i].classList.toggle("backsideCard");
    containerRef[i].classList.toggle("transformOff");
    pokemonCardRef[i].classList.toggle("d_none");
  }
  overwriteBigCardOpen(true);
  renderPokemonDetails(IndexPokeID);
}

/**
 * Plays the sound of a Pokémon based on its index ID.
 *
 * @param {number} IndexPokeID - The index ID of the Pokémon whose sound is to be played.
 */
export function playSound(IndexPokeID) {
  let pokemonCries = new Audio(pokemonDataCache[IndexPokeID].pokemon.cries.latest);
  pokemonCries.volume = 0.05;
  pokemonCries.play();
}

/**
 * Plays the cry sound for a specific Pokémon based on its ID.
 *
 * @param {number} IndexPokeID - The ID of the Pokémon whose cry sound should be played.
 *
 * @example
 * Plays the cry sound for Articuno (ID 144)
 * playCries(144);
 *
 * @example
 * Plays the cry sound for Pikachu (ID 25)
 * playCries(25);
 */
function playCries(IndexPokeID) {
  if (IndexPokeID === 144) {
    soundGiulianoSong.volume = 0.2;
    soundGiulianoSong.play();
  }
  if (IndexPokeID === 25) {
    let pokemonCries = new Audio(pokemonDataCache[IndexPokeID].pokemon.cries.latest);
    pokemonCries.volume = 0.05;
    pokemonCries.play();
  }
}

/**
 * Toggles the visibility of the big card and updates the state of related elements.
 *
 * This function performs the following actions:
 * - Toggles the "d_none" class on the big card content reference.
 * - Shows navigation buttons if the big card is open.
 * - Toggles the "backsideCard" and "transformOff" classes on each card and container reference.
 * - Toggles the "d_none" class on each Pokémon card reference after a delay of 200ms.
 * - Pauses the Giuliano song sound.
 * - Sets the big card open state to false.
 */
function toggleBigCard() {
  contentBigCardRef.classList.toggle("d_none");
  if (bigCardOpen) navButtonsShow();
  for (let i = 0; i < cardRef.length; i++) {
    cardRef[i].classList.toggle("backsideCard");
    containerRef[i].classList.toggle("transformOff");
    setTimeout(() => {
      pokemonCardRef[i].classList.toggle("d_none");
    }, 200);
  }
  soundGiulianoSong.pause();
  overwriteBigCardOpen(false);
}

// https://alvarotrigo.com/blog/prevent-scroll-on-scrollable-element-js/
/**
 * Prevents the default scrolling behavior and stops the event from propagating.
 *
 * @param {Event} e - The event object.
 * @returns {boolean} Always returns false to indicate that the default action has been prevented.
 */
document.querySelector("#contentBigCard").addEventListener("wheel", preventScroll, { passive: false });
function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

/**
 * Prevents the default action for the ArrowUp and ArrowDown keys when the big card is open.
 *
 * @param {KeyboardEvent} e - The keyboard event object.
 */
document.addEventListener("keydown", function (e) {
  if ((e.key === "ArrowUp" && bigCardOpen) || (e.key === "ArrowDown" && bigCardOpen)) {
    e.preventDefault();
  }
});

/**
 * Adds an event listener to the `contentBigCardRef` element that toggles the visibility of the big card when clicked.
 *
 * @event
 * @param {MouseEvent} event - The mouse event object.
 * @listens HTMLElement#click
 */
contentBigCardRef.addEventListener("click", function (event) {
  if (event.target === contentBigCardRef) toggleBigCard();
});

/**
 * Adds an event listener to the document that listens for the "keydown" event.
 * If the "Escape" key is pressed and the big card is open, it toggles the visibility of the big card.
 *
 * @event
 * @param {KeyboardEvent} event - The keyboard event object.
 * @listens Document#keydown
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && bigCardOpen) toggleBigCard();
});

/**
 * Renders the details of a Pokémon based on its index ID.
 *
 * @async
 * @function renderPokemonDetails
 * @param {number} IndexPokeID - The index ID of the Pokémon to render.
 * @returns {Promise<void>} - A promise that resolves when the Pokémon details have been rendered.
 *
 * @description
 * This function fetches the necessary Pokémon data arrays and uses them to render the details of a Pokémon
 * in a big card format. It handles edge cases where the index ID is less than 1 or greater than or equal to
 * the Pokémon limit by wrapping around to the other end of the range.
 *
 * @example
 * Render details for the Pokémon with index ID 5
 * renderPokemonDetails(5);
 */
export async function renderPokemonDetails(IndexPokeID) {
  if (IndexPokeID < 1) {
    IndexPokeID = pokemonLimit - 1;
  } else if (IndexPokeID >= pokemonLimit) {
    IndexPokeID = 1;
  }
  contentBigCardRef.innerHTML = "";
  const { pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray } = await getPokemonDataArrays();
  contentBigCardRef.innerHTML = renderPokemonBigCardTemplate(
    pokemonDataArray[IndexPokeID - 1],
    pokemonFlavorTextArray[IndexPokeID - 1],
    pokemonGeneraTextArray[IndexPokeID - 1],
    pokemonNamesTextArray[IndexPokeID - 1],
    IndexPokeID,
    labels
  );
  getDataForChart(pokemonDataArray[IndexPokeID - 1]);
}

/**
 * Extracts specific stats from a Pokémon data array and renders a chart with those stats.
 *
 * @param {Object} pokemonDataArray - The array containing Pokémon data.
 * @param {Object[]} pokemonDataArray.stats - The array of stats objects.
 * @param {number} pokemonDataArray.stats[].base_stat - The base stat value.
 * @param {Object} pokemonDataArray.stats[1] - The object containing the attack stat.
 * @param {Object} pokemonDataArray.stats[2] - The object containing the defense stat.
 * @param {Object} pokemonDataArray.stats[3] - The object containing the special attack stat.
 * @param {Object} pokemonDataArray.stats[4] - The object containing the special defense stat.
 * @param {Object} pokemonDataArray.stats[5] - The object containing the speed stat.
 */
function getDataForChart(pokemonDataArray) {
  let attack = pokemonDataArray.stats[1].base_stat;
  let defense = pokemonDataArray.stats[2].base_stat;
  let specialAttack = pokemonDataArray.stats[3].base_stat;
  let specialDefense = pokemonDataArray.stats[4].base_stat;
  let speed = pokemonDataArray.stats[5].base_stat;
  renderChart(attack, defense, specialAttack, specialDefense, speed);
}

/**
 * Renders a bar chart displaying various stats.
 *
 * @param {number} attack - The attack stat value.
 * @param {number} defense - The defense stat value.
 * @param {number} specialAttack - The special attack stat value.
 * @param {number} specialDefense - The special defense stat value.
 * @param {number} speed - The speed stat value.
 */
function renderChart(attack, defense, specialAttack, specialDefense, speed) {
  const ctx = document.getElementById("myChart");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Atk", "Def", "Sp. Atk", "Sp. Def", "Spd"],
        datasets: [
          {
            data: [attack, defense, specialAttack, specialDefense, speed],
            backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)", "rgba(255, 159, 64, 0.8)"],
            borderColor: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            title: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: true,
              color: "black",
              font: {
                size: 11,
              },
            },
            title: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            anchor: "end",
            align: "end",
            offset: -25,
            formatter: (value) => value,
            color: "black",
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }
}
