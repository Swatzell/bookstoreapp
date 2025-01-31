var express = require("express");
var db = require("../db");
var router = express.Router();

router.get("/", function (req, res) {
    db.all("SELECT * FROM books", function (err, rows) {
        res.json(rows);
    });
});

router.get("/reviews/:bookId", function (req, res) {
    db.all("SELECT * FROM reviews WHERE book_id = ?", [req.params.bookId], function (err, rows) {
        res.json(rows);
    });
});

module.exports = router;