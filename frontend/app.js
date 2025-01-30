document.addEventListener("DOMContentLoaded", function () {
    var booksContainer = document.getElementById("books");

    function fetchBooks() {
        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(books => {
                booksContainer.innerHTML = "";
                books.forEach(function (book) {
                    var bookDiv = document.createElement("div");
                    bookDiv.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author}</p>
                        <p>Genre: ${book.genre}</p>
                        <p>Price: $${book.price}</p>
                        <button onclick="addToCart(${book.id}, ${book.price})">Add to Cart</button>
                    `;
                    booksContainer.appendChild(bookDiv);
                });
            });
    }

    window.addToCart = function (bookId, price) {
        alert("Book " + bookId + " added to cart!");
    };

    fetchBooks();
});