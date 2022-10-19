const db = require("../models");
const Area = db.area;

exports.findAll = (req, res) => {
    Area.find()
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
