// Contient les fonctions utiliser pour les messages

const db = require("../models");
const Message = db.message;
const Op = db.Sequelize.Op;




// Creation et envoi d'un nouveau message
exports.create = (req, res) => {
    // Validation de la requete
    if (!req.body.destinataire) {
      res.status(400).send({
        message: "il est necessaire de rentrer un destinataire"
      });
      return;
    }
    // Creation d'un message
    const message = {
      sujet: req.body.sujet,
      auteur: req.body.auteur,
      destinataire: req.body.destinataire,
      message: req.body.message
    };
    // Sauvegarde dans la bdd
   Message.create(message)
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







  // Recherche de tous les messages d'un utilisateur
exports.findByUser = (req, res) => {
  const user = req.params.user;
  Message.findAll({ where: { destinataire: user } })
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






// Supprimer un message avec son ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Message.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le message à bien été supprimé !"
          });
        } else {
          res.send({
            message: `Aucun message avec cet id à été trouvé !`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Probleme lors de l'execution de la requete avec l'id : " + id
        });
      });
  };
  