module.exports = app => {
    const area = require("../controllers/area.controller.js");
  
    var router = require("express").Router();
      
    // Retrieve all Tutorials
    router.get("/", area.findAll);
  
    app.use('/api/area', router);
  };