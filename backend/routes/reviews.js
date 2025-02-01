var express = require("express");
var db = require("../db");
var router = express.Router();

router.get("/:bookId", function (req, res) {
    db.all("SELECT * FROM reviews WHERE book_id = ?", [req.params.bookId], function (err, rows) {
        res.json(rows);
    });
});

router.get("/user/:userId", function (req, res) {
    db.all("SELECT * FROM reviews WHERE user_id = ?", [req.params.userId], function (err, rows) {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

module.exports = router;