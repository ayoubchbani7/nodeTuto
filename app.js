// Importation des modules nécessaires
const express = require('express'); // Pour utiliser Express
let pokemons = require('./mock-pokemon'); // Notre "base de données" de pokémons
const { success, getUniqueId } = require('./helper.js'); // Fonctions helpers
const app = express(); // Création de l'application Express
const port = 3001; // Port d'écoute de l'application
const morgan = require('morgan'); // Pour les logs

const favicon = require('serve-favicon'); // Gestion du favicon
const bodyParser = require('body-parser'); // Pour accéder au corps JSON de la requête

// Middlewares applicatifs généraux
app
  .use(favicon(__dirname + '/favicon.ico')) // Favicon
  .use(morgan('dev')) // Logger les requêtes HTTP
  .use(bodyParser.json()); // Parser le JSON

// Route : Récupérer tous les pokémons
app.get('/api/pokemons', (req, res) => {
  // Renvoie la liste complète des pokémons
  const message = "Les pokémons ont été bien trouvés";
  res.json(success(message, pokemons));
});

// Route : Récupérer un pokémon en particulier grâce à son id
app.get('/api/pokemons/:id', (req, res) => {
  // Cherche le pokémon correspondant à l'id fourni
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find(pokemon => pokemon.id === id);
  const message = 'Le pokémon a été bien trouvé';
  res.json(success(message, pokemon));
});

// Route : Créer un nouveau pokémon (POST)
app.post('/api/pokemons', (req, res) => {
  // Créer un nouvel objet pokémon avec un id unique et la date de création
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated); // Ajout dans le tableau pokémons
  const message = `Le pokémon ${pokemonCreated.name} a été bien créé !`;
  res.json(success(message, pokemonCreated));
});

// Route : Modifier un pokémon existant (PUT)
app.put('/api/pokemons/:id', (req, res) => {
  // Met à jour le pokémon correspondant à l'id fourni
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`;
  res.json(success(message, pokemonUpdated));
});

// Route : Supprimer un pokémon (DELETE)
app.delete('/api/pokemons/:id', (req, res) => {
  // Supprime le pokémon correspondant à l'id fourni
  const id = parseInt(req.params.id);
  const pokemonToDelete = pokemons.find(pokemon => pokemon.id === id);
  pokemons = pokemons.filter(pokemon => pokemon !== pokemonToDelete);
  const message = `Le pokémon a bien été supprimé`;
  res.json(success(message, pokemons));
});

// Lancement du serveur sur le port spécifié
app.listen(port, () => {
  console.log(port, `Notre application Node est démarrée sur : http://localhost:${port}`);
});