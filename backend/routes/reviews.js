var express = require("express");
var db = require("../db");
var router = express.Router();


router.post("/add", function (req, res) {
    var { book_id, user_id, rating, review_text } = req.body;

  
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [book_id, user_id, rating, review_text],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: "Review submitted successfully!" });
        }
    );
});
router.get("/user/:userId", function (req, res) {
    db.all(`
        SELECT reviews.id, reviews.book_id, books.title AS book_title, reviews.rating, reviews.review_text, reviews.created_at
        FROM reviews
        JOIN books ON reviews.book_id = books.id
        WHERE reviews.user_id = ?
        ORDER BY reviews.created_at DESC
    `, [req.params.userId], function (err, rows) {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
module.exports = router;