// Routage des differentes routes de Livre

module.exports = app => {
    const livres = require("../controllers/livre.controller.js");
    var router = require("express").Router();
    
    // Creer un nouveau livre.
    router.post("/", livres.create);

    // Recuperer tout les livres.
    router.get("/", livres.findAll);

    // Recuperer un seul livre avec son titre
    router.get("/:id", livres.findOne);

    // Recuperer les livres d'une categorie
     router.get("/bycategorie/:categorie", livres.findByCategorie);

    // Recuperer les livres loué par un user
    router.get("/location/:user", livres.findByUser);

    // Location d'un livre par un user
    router.put("/location/:id", livres.update); 

     // Rendu d'un livre par un user
     router.put("/:id", livres.update); 



    app.use('/api/livres', router);
  };