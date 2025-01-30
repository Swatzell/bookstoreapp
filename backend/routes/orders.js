var express = require("express");
var db = require("../db");
var router = express.Router();

router.post("/", function (req, res) {
    var { user_id, total_price } = req.body;
    db.run("INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')", [user_id, total_price], function (err) {
        if (err) return res.status(500).send(err.message);
        res.json({ message: "Order placed!" });
    });
});

module.exports = router;