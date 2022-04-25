// Routage des differentes routes de Message

module.exports = app => {
    const messages = require("../controllers/message.controller.js");
    var router = require("express").Router();
    
    // Envoyer un nouveau message
    router.post("/", messages.create);

   // Recuperer les messages reçu d'un user
   router.get("/:user", messages.findByUser);

   // Supprimer un message avec son id
   router.delete("/:id", messages.delete);





   app.use('/api/messages', router);
};




