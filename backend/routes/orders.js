var express = require("express");
var db = require("../db");
var router = express.Router();

router.post("/", function (req, res) {
    var { user_id, total_price, items } = req.body;

    db.run("INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')", [user_id, total_price], function (err) {
        if (err) return res.status(500).send(err.message);
        
        var orderId = this.lastID;
        items.forEach(function (item) {
            db.run("INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)", 
                [orderId, item.book_id, item.quantity, item.price]
            );
  

db.run("UPDATE books SET stock_quantity = stock_quantity - ? WHERE id = ?", [item.quantity, item.book_id]);
        });

        res.json({ message: "Order placed!", order_id: orderId });
    });
});

module.exports = router;