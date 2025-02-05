var sqlite3 = require("sqlite3").verbose();
var bcrypt = require("bcryptjs");

var db = new sqlite3.Database("./database/bookstore.db");

db.serialize(function () {
    console.log("Seeding database...");

   
    db.run("DELETE FROM users"); 
    var hashedPassword1 = bcrypt.hashSync("password123", 8);
    var hashedPassword2 = bcrypt.hashSync("password123", 8);

    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ["John Doe", "john@example.com", hashedPassword1]);
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ["Jane Smith", "jane@example.com", hashedPassword2]);


    db.run("DELETE FROM books");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 10.99, 15)");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('1984', 'George Orwell', 'Dystopian', 12.50, 30)");

    db.run("DELETE FROM reviews"); 
    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text) VALUES (1, 1, 5, 'A timeless classic!')");
    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text) VALUES (2, 2, 4, 'Very thought-provoking.')");

    db.run("DELETE FROM orders"); 
    db.run("DELETE FROM order_items"); 
    console.log("Database seeded successfully!");

 
    db.close(function (err) {
        if (err) {
            console.error("Error closing database:", err.message);
        } else {
            console.log("Database connection closed.");
        }
    });
});