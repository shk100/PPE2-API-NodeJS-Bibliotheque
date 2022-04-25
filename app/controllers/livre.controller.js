// Contient les fonctions utiliser pour les livres

const db = require("../models");
const Livre = db.livre;
const Op = db.Sequelize.Op;




// Creation et enregistrement d'un nouveau livre
exports.create = (req, res) => {
    // Validation de la requete
    if (!req.body.titre) {
      res.status(400).send({
        message: "Il est necessaire de rentrer un titre !"
      });
      return;
    }
    // Creation d'un livre
    const livre = {
      titre: req.body.titre,
      auteur: req.body.auteur,
      annee: req.body.annee,
      description: req.body.description,
      categorie: req.body.categorie,
      disponible: req.body.disponible ? req.body.disponible : "1"
    };
    // Sauvegarde dans la bdd
    Livre.create(livre)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Il y a eu un probleme lors de la requete"
        });
      });
  };





// Recuperer tout les livres de la bdd
exports.findAll = (req, res) => {
    const titre = req.query.titre;
    var condition = titre ? { titre: { [Op.like]: `%${titre}%` } } : null;
    Livre.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Un probleme est survenu lors de la requete pour recuperer tout les livres."
        });
      });
  };






// Rechercher un titre de livre dans la bdd
exports.findOne = (req, res) => {
    const titre = req.params.id;
    Livre.findOne({ where: { titre: titre } })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Impossible de trouver un livre avec le titre =${titre}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Un probleme est survenu lors de la requete pour le titre=" + titre
        });
      });
  };







  // Trouver tout les livres d'une certaine catégorie
exports.findByCategorie = (req, res) => {
  const categorie = req.params.categorie;
  Livre.findAll({ where: { categorie: categorie } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Un probleme est survenu lors de la requete."
      });
    });
};

  // Trouver tout les livres loués par un user
  exports.findByUser = (req, res) => {
    const mail = req.params.user;
    Livre.findAll({ where: { user: mail } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Un probleme est survenu lors de la requete."
        });
      });
  };


// Location d'un livre par un user (modification user et disponibilité depuis l'app)
exports.update = (req, res) => {
  const titre = req.params.id;
  Livre.update(req.body, {
    where: { titre: titre }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le livre a bien été loué"
        });
      } else {
        res.send({
          message: `Impossible de louer le livre`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Un probleme est survenu lors de la requete"
      });
    });
};






// Rendu d'un livre par un user (modification user et disponibilité depuis l'app)
exports.update = (req, res) => {
  const titre = req.params.id;
  Livre.update(req.body, {
    where: { titre: titre }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le livre a bien été rendu"
        });
      } else {
        res.send({
          message: `Impossible de rendre le livre`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Un probleme est survenu lors de la requeten"
      });
    });
};



















