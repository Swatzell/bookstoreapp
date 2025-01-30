var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var db = require("../db");
var router = express.Router();

const SECRET_KEY = "MY_SECRET_KEY";
router.post("/register", function (req, res) {
    var { name, email, password } = req.body;
    var hashedPassword = bcrypt.hashSync(password, 8);

    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], function (err) {
        if (err) return res.status(500).send(err.message);
        res.json({ message: "User registered!" });
    });
});

router.post("/login", function (req, res) {
    var { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ?", [email], function (err, user) {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send("Invalid credentials");
        }
        var token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });
        res.json({ token });
    });
});

module.exports = router;