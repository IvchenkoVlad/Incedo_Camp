module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", user.create);
  
    // Retrieve all Tutorials
    router.get("/", user.findAll);
  
    // Update a Tutorial with id
    router.put("/update", user.update);
  
    app.use('/api/user', router);
  };