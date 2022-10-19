module.exports = app => {
    const project = require("../controllers/project.controller.js");
  
    var router = require("express").Router();

      
    // Retrieve all projects
    router.get("/", project.findAll);

    // Retrieve all project by area
    router.get("/projectsByArea/:areaID", project.findByArea);

    router.get("/projects/dateRange/:from/:to", project.findByDate);
    router.post("/projects/insertMany", project.createMany);
  
    app.use('/api/project', router);
  };

  /*// Create a new Tutorial
    router.post("/", project.create);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", project.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", project.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", project.delete);
  
    // Create a new Tutorial
    router.delete("/", project.deleteAll);
  
    app.use('/api/project', router); */