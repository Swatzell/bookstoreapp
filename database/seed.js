var sqlite3 = require("sqlite3").verbose();
var bcrypt = require("bcryptjs");

var db = new sqlite3.Database("./database/bookstore.db");

db.serialize(function () {
    console.log("Seeding database...");

    // Users Table
    db.run("DELETE FROM users"); // Ensure no duplicates
    var hashedPassword1 = bcrypt.hashSync("password123", 8);
    var hashedPassword2 = bcrypt.hashSync("password123", 8);

    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ["John Doe", "john@example.com", hashedPassword1]);
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ["Jane Smith", "jane@example.com", hashedPassword2]);

    // Books Table
    db.run("DELETE FROM books"); // Ensure no duplicates
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 10.99, 15)");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('1984', 'George Orwell', 'Dystopian', 12.50, 30)");

    // Reviews Table
    db.run("DELETE FROM reviews"); // Ensure no duplicates
    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text) VALUES (1, 1, 5, 'A timeless classic!')");
    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text) VALUES (2, 2, 4, 'Very thought-provoking.')");

    // Orders Table
    db.run("DELETE FROM orders"); // Ensure no duplicates
    db.run("DELETE FROM order_items"); // Ensure no duplicates

    console.log("Database seeded successfully!");

    // ✅ Close database AFTER all operations are complete
    db.close(function (err) {
        if (err) {
            console.error("Error closing database:", err.message);
        } else {
            console.log("Database connection closed.");
        }
    });
});