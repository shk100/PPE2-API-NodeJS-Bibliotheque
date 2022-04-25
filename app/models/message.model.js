// Model de création de la table Message

module.exports = (sequelize, Sequelize) => {
    const Livre = sequelize.define("message", {
      sujet: {
        type: Sequelize.STRING
      },
      auteur: {
        type: Sequelize.STRING
      },
      destinataire: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      }
    });
    return Livre;
  };

  