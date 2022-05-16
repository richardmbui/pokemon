let numGuesses = 3;
let numRunaway = 0;
let numSkip = 0;

let apiData = {
  url: "https://pokeapi.co/api/v2/",
  type: "pokemon",
  id: Math.floor(Math.random() * 151).toString(),
};

// destructuring
const { url, type, id } = apiData;

const apiUrl = `${url}${type}/${id}`;

fetch(apiUrl)
  .then((data) => data.json())
  .then((pokemon) => generateHtml(pokemon));

const pokemon_typings = (data) => {
  if (data.types.length == 1) {
    return data.types[0].type.name;
  } else {
    return data.types[0].type.name + " - " + data.types[1].type.name;
  }
};

const userGuessing = () => {
  let movieInput = document.getElementById("userGuess").value;
  let html;
  // console.log(movieInput.toLowerCase());
  fetch(apiUrl)
    .then((data) => data.json())
    .then((pokemon) => {
      if (movieInput.toLowerCase() === pokemon.name) {
        console.log("correct");
        html = `
      <p>Correct!</p>
      <button onclick="window.location.reload()">Next Pokémon</button>
      `;
        const pokemonDiv = document.querySelector(".result");
        pokemonDiv.innerHTML = html;
      } else {
        console.log("incorrect");
        numGuesses--;
        if (numGuesses == 0) {
          html = `<p>Incorrect! No more tries left.</p>
          <button onclick="window.location.reload()">Next Pokémon</button>`;
          document.getElementById("submit").disabled = true;
          document.getElementById("skip").disabled = true;
          //increase the number of pokemon that got away, add this # to database and shown in pokedex
          numRunaway++;
        } else {
          html = `<p>Incorrect! ${numGuesses} tries left.</p>`;
        }
        const pokemonDiv = document.querySelector(".result");
        pokemonDiv.innerHTML = html;
      }
    });
};

function skip() {
  //increase the number of skips, add this # to database and shown in pokedex
  numSkip++;
  location.reload();
}

const generateHtml = (data) => {
  console.log(data);
  const html = `
  <div class = "name">Pokédex Num. ${data.id}</div> 
        <img src=${data.sprites.front_default}>
        <div class = "details_box">
            <span class = "tag_details">
            Type: ${pokemon_typings(data)}
            </span>    
            <span class = "tag_details">Height: ${data.height / 10} m</span>
            <span class = "tag_details">Weight: ${data.weight / 10} kg</span> &nbsp
            <button type="button" class="btn btn-danger btn-sm"><u>Go To <strong>Pokédex</strong></u></button>
        </div> <br>

    `;
  const pokemonDiv = document.querySelector(".pokemon");
  pokemonDiv.innerHTML = html;
};
