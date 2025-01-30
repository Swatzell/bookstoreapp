var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./database/bookstore.db");

db.serialize(function () {
    db.run("INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', 'password123')");
    db.run("INSERT INTO users (name, email, password) VALUES ('Jane Smith', 'jane@example.com', 'password123')");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 10.99, 15)");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 8.99, 20)");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('1984', 'George Orwell', 'Dystopian', 12.50, 30)");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('Moby Dick', 'Herman Melville', 'Adventure', 15.00, 10)");
    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES ('War and Peace', 'Leo Tolstoy', 'Historical Fiction', 20.99, 5)");
    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text) VALUES (1, 1, 5, 'An absolute classic!')");
    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text) VALUES (2, 2, 4, 'Very thought-provoking.')");

    console.log("Database seeded successfully!");
});

db.close();