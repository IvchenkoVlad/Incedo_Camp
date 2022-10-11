const mysql = require('mysql');
const database = require('./dbConfig.js');


const db = new database();

var dbConn = mysql.createPool({
    host: db.getHostName(),
    user : db.getUserName(),
    password : db.getPassword(),
    database :db.getDataBaseName()
})   
module.exports = dbConn;