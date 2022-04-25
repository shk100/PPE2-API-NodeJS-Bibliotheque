// Contient les fonctions utiliser pour les users


const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;




// Creation d'un nouveau user
exports.create = (req, res) => {
    // Validation de la requete
    if (!req.body.nom) {
      res.status(400).send({
        message: "Il faut rentrer un nom"
      });
      return;
    }
    // Creation de l'user
    const token = "token";
    const user = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      mail: req.body.mail,
      pass: req.body.pass,
      token:  req.body.pass,                 // MODIFIER LE TOKEN PAR UNE GENERATION ALEATOIRE
      status: req.body.status ? req.body.status : "1"    // Par default status utilisateur
    };
    // Sauvegarde dans la bdd
    User.create(user)
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





// Recuperer tout les users de la bdd
exports.findAll = (req, res) => {
    const nom= req.query.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Un probleme est survenu lors de la requete pour recuperer tout les users."
        });
      });
  };








  // Verifie le login de l'utilisateur et lui attribue un token
  exports.Login = (req, res) => {

    // Generation d'un token 
    var rand = function() {
      return Math.random().toString(36).substr(2);
  };
  var token = function() {
      return rand() + rand(); 
  };

    const mail = req.params.id;
    const pass = req.params.pass;
    User.findOne({ where: { mail: mail } })
      .then(data => {
        if (data) {
            const tmpMail = data.mail;
            const tmpPass = data.pass

         if(tmpMail == mail & tmpPass == pass)
            {
          //  res.send(token());
          res.send(data);
            }else{
              res.status(404).send({
                message: `Mail ou mot de passe incorect.`});
            }

        } else {
          res.status(404).send({
            message: `Il faut entrer un mail et un mot de passe.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Un probleme est survenu lors l'identification"
        });
      });
  };










// Recherche d'un user dans la bdd avec son mail
exports.findOne = (req, res) => {
    const mail = req.params.id;
    User.findOne({ where: { mail: mail } })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Impossible de trouver ce mail.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Un probleme est survenu lors de la requete pour le mail"
        });
      });
  };








// Modifier un utilisateur a partir de son mail
exports.update = (req, res) => {
    const mail = req.params.id;
    User.update(req.body, {
      where: { mail: mail }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'utilisateur à bien été modifié"
          });
        } else {
          res.send({
            message: `Impossible de modifier l'utilisateur`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Probleme lors de la modification"
        });
      });
  };





