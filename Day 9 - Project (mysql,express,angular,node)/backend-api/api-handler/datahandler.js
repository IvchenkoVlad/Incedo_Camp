var express = require('express');
var app = express();
var dbConn = require('../dbconfig/db')
var bodyParser = require('body-parser');
var cors = require('cors')
const Project = require('../api-handler/model/project');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(cors())

//GETTING ALL PROJECTS
app.get('/projects', function (req, res) {
   dbConn.query('SELECT * FROM project', function (error, results) {
      if (error) throw error;
      return res.send(results);
   });
});

app.get('/projectsByArea/:areaID', function (req, res) {
    let areaID = req.params.areaID;
    dbConn.query('SELECT * FROM project where areafk =?', areaID, function (error, results) {
       if (error) throw error;
       return res.send(results);
    });
 });

 app.get('/area', function (req, res) {
   dbConn.query('SELECT * FROM designationarea', function (error, results) {
      if (error) throw error;
      return res.send(results);
   });
});


 var server = app.listen(3002, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})