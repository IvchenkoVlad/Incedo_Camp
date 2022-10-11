var express = require('express');
var app = express();
var dbConn = require('../dbconfig/db')
var bodyParser = require('body-parser');
var cors = require('cors')
const User = require('../api-handler/model/user');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(cors())

//GETTING ALL USERS
app.get('/users', function (req, res) {
   dbConn.query('SELECT * FROM user', function (error, results) {
      if (error) throw error;
      return res.send(results);
   });
});

//ADD A NEW USER (ID AUTO INCREMENTS)
app.post('/users/create', function (req, res) {
    let user = new User(req.body.username, req.body.password, req.body.name, req.body.role, req.body.status, req.body.requestdate)
    dbConn.query('INSERT INTO user SET ?', user, function (error, results) {
       if (error) throw error;
       return res.send({message: `Successfully inserted with the new id:${results.insertId}`});
    });
 });

 app.put('/users/update', function (req, res) {
   let user = new User(req.body.username, req.body.password, req.body.name, req.body.role, req.body.status, req.body.requestdate)
   let userId = user.username
   dbConn.query('UPDATE user SET ? WHERE username=?', [user, userId], function (error, results) {
      if (error) throw error;
      console.log(results)
      console.log(results)
      return res.send(results);
   });
});

 var server = app.listen(3001, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})