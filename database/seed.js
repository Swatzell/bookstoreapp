var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./database/bookstore.db");

db.serialize(() => {
    db.run("DELETE FROM users");
    db.run("DELETE FROM books");
    db.run("DELETE FROM reviews");
    db.run("DELETE FROM orders");
    db.run("DELETE FROM order_items");

    console.log("✅ Cleared existing data");


    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        ["Alice Johnson", "alice@example.com", "$2b$10$abcdefghijklmnopqrstuvwxyz123456789"], 
        function () { console.log("✅ Added user Alice") }
    );
    
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        ["Bob Smith", "bob@example.com", "$2b$10$abcdefghijklmnopqrstuvwxyz987654321"], 
        function () { console.log("✅ Added user Bob") }
    );


    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        ["The Great Gatsby", "F. Scott Fitzgerald", "Classic", 10.99, 15], 
        function () { console.log("✅ Added book The Great Gatsby") }
    );

    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        ["1984", "George Orwell", "Dystopian", 12.50, 30], 
        function () { console.log("✅ Added book 1984") }
    );

    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        ["To Kill a Mockingbird", "Harper Lee", "Fiction", 11.25, 20], 
        function () { console.log("✅ Added book To Kill a Mockingbird") }
    );

    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        ["The Hobbit", "J.R.R. Tolkien", "Fantasy", 14.99, 25], 
        function () { console.log("✅ Added book The Hobbit") }
    );

    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        ["Pride and Prejudice", "Jane Austen", "Romance", 9.99, 18], 
        function () { console.log("✅ Added book Pride and Prejudice") }
    );

    db.run("INSERT INTO books (title, author, genre, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        ["The Catcher in the Rye", "J.D. Salinger", "Fiction", 13.50, 22], 
        function () { console.log("✅ Added book The Catcher in the Rye") }
    );


    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [1, 1, 5, "A timeless classic with deep themes."], 
        function () { console.log("✅ Added review for The Great Gatsby") }
    );

    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [2, 2, 4, "A dystopian novel that remains relevant."], 
        function () { console.log("✅ Added review for 1984") }
    );

    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [3, 1, 5, "A deeply moving and impactful book."], 
        function () { console.log("✅ Added review for To Kill a Mockingbird") }
    );

    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [4, 2, 5, "An amazing fantasy adventure!"], 
        function () { console.log("✅ Added review for The Hobbit") }
    );

    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [5, 1, 4, "A beautiful love story with wit and humor."], 
        function () { console.log("✅ Added review for Pride and Prejudice") }
    );

    db.run("INSERT INTO reviews (book_id, user_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
        [6, 2, 3, "An interesting coming-of-age novel."], 
        function () { console.log("✅ Added review for The Catcher in the Rye") }
    );

    db.run("INSERT INTO orders (user_id, total_price, status, order_date) VALUES (?, ?, ?, datetime('now'))",
        [1, 10.99, "completed"], 
        function () { console.log("✅ Added order for user Alice") }
    );

    db.run("INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)",
        [1, 1, 1, 10.99], 
        function () { console.log("✅ Linked order to The Great Gatsby") }
    );

    db.run("INSERT INTO orders (user_id, total_price, status, order_date) VALUES (?, ?, ?, datetime('now'))",
        [2, 27.49, "completed"], 
        function () { console.log("✅ Added order for user Bob") }
    );

    db.run("INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)",
        [2, 2, 1, 12.50], 
        function () { console.log("✅ Linked order to 1984") }
    );

    db.run("INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)",
        [2, 4, 1, 14.99], 
        function () { console.log("✅ Linked order to The Hobbit") }
    );

    console.log("✅ Database seeding complete!");
});

db.close();