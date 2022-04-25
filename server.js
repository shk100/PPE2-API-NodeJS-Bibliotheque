const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse la requete avec le content type application/json
app.use(express.json());

// Parse la requete en format x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le PPE API de la bibliotheque ! par AIT SLIMANI MEHDI" });
});

const db = require("./app/models");
db.sequelize.sync();


// Affiche quel port est utilisé par le serveur local
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port : ${PORT}.`);
});

require("./app/routes/livre.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/message.routes")(app);
