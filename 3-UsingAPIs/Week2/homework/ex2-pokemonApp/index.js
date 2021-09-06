'use strict';
/*------------------------------------------------------------------------------
Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/

const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    const jsonData = await response.json();
    return jsonData;
  } else {
    throw new Error('HTTP ERROR ' + response.status);
  }
}

function fetchAndPopulatePokemons(pokemons, elementContainer) {
  for (const pokemon of pokemons) {
    const pokemonOptionElement = document.createElement('option');
    pokemonOptionElement.value = pokemon.url;
    pokemonOptionElement.textContent = pokemon.name;
    elementContainer.appendChild(pokemonOptionElement);
  }
}

async function fetchImage(e, pokemonImageElement) {
  const url = e.target.value;
  try {
    const results = await fetchData(url);
    pokemonImageElement.src = results.sprites.front_default;
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  let pokemons = [];
  try {
    const pokemonsData = await fetchData(URL);
    pokemons = pokemonsData.results;
  } catch (err) {
    console.log(err);
  }

  const bodyElement = document.querySelector('body');
  const getPokemonsButtonElement = document.createElement('button');
  const pokemonSelectElement = document.createElement('select');
  const pokemonImageElement = new Image();

  getPokemonsButtonElement.textContent = 'Get Pokemons!';
  getPokemonsButtonElement.addEventListener('click', () => {
    fetchAndPopulatePokemons(pokemons, pokemonSelectElement);
  });
  bodyElement.appendChild(getPokemonsButtonElement);

  pokemonSelectElement.addEventListener('change', (e) => {
    fetchImage(e, pokemonImageElement);
  });
  bodyElement.appendChild(pokemonSelectElement);

  bodyElement.appendChild(pokemonImageElement);
}

window.addEventListener('load', main);
