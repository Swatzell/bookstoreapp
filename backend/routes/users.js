var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var db = require("../db");
var router = express.Router();

const SECRET_KEY = "MY_SECRET_KEY"; 

router.post("/register", function (req, res) {
    var { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });

        if (user) {
            return res.status(400).json({ error: "Email already exists. Please log in." });
        }
        bcrypt.hash(password, 10, function (err, hashedPassword) {
            if (err) {
                return res.status(500).json({ error: "Error hashing password." });
            }

        db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Registration successful!" });
            }
        );
    });
});
})
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