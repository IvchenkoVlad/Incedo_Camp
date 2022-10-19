const { project } = require("../models");
const db = require("../models");
const Project = db.project;

exports.findAll = (req, res) => {
    Project.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.findByArea = (req, res) => {
    const area = req.params.areaID;
    Project.find({ areafk: area })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.findByDate = (req, res) => {
    const from = req.params.from;
    const to = req.params.to;
    // Project.find({startdate: {$gte: new Date(from).toISOString(), $lt: new Date(to).toISOString()}})
    Project.find({startdate: {$gte: new Date(from).toISOString(), $lt: new Date(to).toISOString()}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.createMany = (req, res) => {
    // Validate request

    var onject = req.body
  
    // Save Tutorial in the database
    project
      .insertMany(onject)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };


// Create and Save a new Tutorial
//WORKS
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.name) {
//       res.status(400).send({ message: "Content can not be empty!" });
//       return;
//     }
  
//     // Create a Tutorial
//     const project = new Project({
//         name: req.body.name,
//         sapid: req.body.sapid,
//         projecthours: req.body.projecthours,
//         leaveholidayhours: req.body.leaveholidayhours,
//         noonshifts: req.body.noonshifts,
//         nightshifts: req.body.nightshifts,
//         taeligibledays: req.body.taeligibledays,
//         transportationallowance: req.body.transportationallowance,
//         totalallowance: req.body.totalallowance,
//         areafk: req.body.areafk
//     });
  
//     // Save Tutorial in the database
//     project
//       .save(project)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the user."
//         });
//       });
//   };

// Retrieve all Tutorials from the database.
//WORKS


// Find a single Tutorial with an id
//WORKS
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     User.findById(id)
//       .then(data => {
//         if (!data)
//           res.status(404).send({ message: "Not found Tutorial with id " + id });
//         else res.send(data);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .send({ message: "Error retrieving Tutorial with id=" + id });
//       });
//   };

// Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//       return res.status(400).send({
//         message: "Data to update can not be empty!"
//       });
//     }
  
//     const id = req.params.id;
  
//     Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//           });
//         } else res.send({ message: "Tutorial was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Tutorial with id=" + id
//         });
//       });
//   };

// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   User.findOneAndUpdate({username:req.body.username}, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Tutorial with id=. Maybe Tutorial was not found!`
//         });
//       } else res.send({ message: "Tutorial was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id="
//       });
//     });
// };
  



// Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
  
//     Tutorial.findByIdAndRemove(id)
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//           });
//         } else {
//           res.send({
//             message: "Tutorial was deleted successfully!"
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id=" + id
//         });
//       });
//   };

// Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     Tutorial.deleteMany({})
//       .then(data => {
//         res.send({
//           message: `${data.deletedCount} Tutorials were deleted successfully!`
//         });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all tutorials."
//         });
//       });
//   };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    const area = req.params.areaID;
    Project.find({ areafk: area })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };