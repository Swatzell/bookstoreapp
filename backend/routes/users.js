var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var db = require("../db");
var router = express.Router();

const SECRET_KEY = "MY_SECRET_KEY"; 

router.post("/login", function (req, res) {
    var { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], function (err, user) {
        if (!user) {
            return res.status(401).send("Invalid email or password.");
        }

        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send("Invalid email or password.");
        }

        var token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    });
});

module.exports = router;