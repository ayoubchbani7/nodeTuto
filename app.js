// Importation des modules nécessaires
const express = require('express'); // Pour utiliser Express
const app = express(); // Création de l'application Express
const morgan = require('morgan'); // Pour les logs
const favicon = require('serve-favicon'); // Gestion du favicon
const bodyParser = require('body-parser'); // Pour accéder au corps JSON de la requête
const sequelize = require('./src/db/sequelize.js');
const port =3001
// Middlewares applicatifs généraux
app
  .use(favicon(__dirname + '/favicon.ico')) // Favicon
  .use(morgan('dev')) // Logger les requêtes HTTP
  .use(bodyParser.json()); // Parser le JSON


sequelize.initDb();
require('./src/routes/findAllPokemons.js')(app)
// Lancement du serveur sur le port spécifié
app.listen(port, () => {
  console.log(port, `Notre application Node est démarrée sur : http://localhost:${port}`);
});