// Model de création de la table Livre

module.exports = (sequelize, Sequelize) => {
    const Livre = sequelize.define("livre", {
      titre: {
        type: Sequelize.STRING
      },
      auteur: {
        type: Sequelize.STRING
      },
      annee: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      categorie: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      disponible: {
        type: Sequelize.INTEGER
      }
    });
    return Livre;
  };

  