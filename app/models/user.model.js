// Model de création de la table User

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      nom: {
        type: Sequelize.STRING
      },
     prenom: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      pass: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      }
    });
    return User;
  };

  