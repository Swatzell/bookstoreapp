var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./database/bookstore.db");

module.exports = db;