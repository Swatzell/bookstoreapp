var express = require("express");
var db = require("../db");
var router = express.Router();

router.post("/create", function (req, res) {
    var { user_id, total_price, items } = req.body;

    db.run("INSERT INTO orders (user_id, total_price, status, order_date) VALUES (?, ?, 'pending', datetime('now'))", 
        [user_id, total_price], function (err) {
        if (err) return res.status(500).send(err.message);

        var orderId = this.lastID;
        items.forEach(function (item) {
            db.run("INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)", 
                [orderId, item.book_id, item.quantity, item.price]);

            db.run("UPDATE books SET stock_quantity = stock_quantity - ? WHERE id = ?", 
                [item.quantity, item.book_id]);
        });

        res.json({ message: "Order placed!", order_id: orderId });
    });
});

router.get("/user/:userId", function (req, res) {
    db.all(`
        SELECT orders.id AS order_id, orders.total_price, orders.status, orders.order_date, 
               books.title AS book_title, order_items.quantity
        FROM orders
        JOIN order_items ON orders.id = order_items.order_id
        JOIN books ON order_items.book_id = books.id
        WHERE orders.user_id = ?
        ORDER BY orders.order_date DESC
    `, [req.params.userId], function (err, rows) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

module.exports = router;