import { contentBigCardRef, cardRef, pokemonCardRef, containerRef, pokemonLimit, bigCardOpen, labels, soundGiulianoSong, pokemonDataCache } from "./globals.js";
import { getPokemonData, getPokemonFlavorText, getPokemonGeneraText, getPokemonNamesText } from "./pokeapiData.js";
import { renderPokemonBigCardTemplate } from "./templates.js";
import { navButtonsShow, navButtonsHide } from "./navigate.js";

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

export function playSound(IndexPokeID) {
  let pokemonCries = new Audio(pokemonDataCache[IndexPokeID].pokemon.cries.latest);
  pokemonCries.volume = 0.05;
  pokemonCries.play();
}

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
  getDataForChart(pokemonDataArray[IndexPokeID - 1]);
}

function getDataForChart(pokemonDataArray) {
  let attack = pokemonDataArray.stats[1].base_stat;
  let defense = pokemonDataArray.stats[2].base_stat;
  let specialAttack = pokemonDataArray.stats[3].base_stat;
  let specialDefense = pokemonDataArray.stats[4].base_stat;
  let speed = pokemonDataArray.stats[5].base_stat;

  renderChart(attack, defense, specialAttack, specialDefense, speed);
}

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
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            grid: {
              display: false, // Rasterlinien
            },
            ticks: {
              display: false, // Skalenwerte
            },
            title: {
              display: false,
            },
            border: {
              display: false, // X-Achsenlinie
            },
          },
          x: {
            grid: {
              display: false, // Rasterlinien
            },
            ticks: {
              display: true, // Skalenwerte
              color: "black",
            },
            title: {
              display: false,
            },
            border: {
              display: false, // X-Achsenlinie
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
            offset: -30,
            formatter: (value) => value,
            color: "black",
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }
}
