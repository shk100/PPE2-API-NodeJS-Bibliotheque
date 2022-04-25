// Routage des differentes routes de User

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    
    // Creer un nouveau user
    router.post("/", users.create);

    // Recuperer tout les users
    router.get("/", users.findAll);

    // Verifier le login d'un user
    router.post("/login/:id/:pass", users.Login);

    // Recuperer un user avec son nom   
    router.get("/:id", users.findOne);

    // Modifier un utilisateur               
    router.put("/:id", users.update);


    app.use('/api/users', router);
  };