process.stdin.setEncoding("utf8");

let http = require("http");
let path = require("path");
let express = require("express");
let bodyParser = require("body-parser");

if (process.argv.length != 2)
{
  process.stdout.write(`Usage test.js`);
  process.exit(1);
}

//Methods
function getPokedexForm()
{
    return `<form id="pokeQuery" action="/" method="get"> 
        <fieldset> 
            <legend>Pokédex</legend> 
            <label>
                <strong>Enter Pokémon: </strong> 
                <input list="pokeIndex" name="pokemon" autocomplete="off">
            </label> 
            <input type="submit" value="Retrieve">
        </fieldset> 
    </form>`;
}

function getPokedexList()
{
    return `<datalist id="pokeIndex">
        <option value="Edge">
        <option value="Firefox">
        <option value="Chrome">
        <option value="Opera">
        <option value="google">
    </datalist>`;
}

function getPokeCard() 
{
    return `<div class="back-container"></div>`;
}

// Start Webserver
let app = express();
let portNumber = 4001;
// let homeRef = `<a href="http://localhost:4001">HOME</a>`;

app.use(bodyParser.urlencoded({extended:false}));
app.use("/public", express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

app.get("/", (request, response) =>
{
    let variables = 
    {
        pokeIndex: getPokedexList(),
        pokeForm: getPokedexForm(),
        pokemon: request.query.pokemon,
        pokeCard: getPokeCard()
    };

    response.render("pokedex", variables);
});

console.log(`Web server is running at http://localhost:4001`);
http.createServer(app).listen(portNumber);

// Command Line Interpreter
let prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);

process.stdin.on("readable", () =>
{
  let dataInput = process.stdin.read();

  if (dataInput !== null)
  {
    let command = dataInput.trim();

    if (command === "stop")
    {
      process.stdout.write("Shutting down the server\n");
      process.exit(0);
    }
    else
    {
        process.stdout.write(`Invalid command: ${command}\n`);
    }

    process.stdout.write(prompt);
    process.stdin.resume();
  }
});