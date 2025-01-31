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
                        <button onclick="viewReviews(${book.id})">View Reviews</button>
                        <div id="reviews-${book.id}" class="reviews"></div>
                    `;
                    booksContainer.appendChild(bookDiv);
                });
            });
    }
   
    window.viewReviews = function (bookId) {
        fetch("http://localhost:3000/books/reviews/" + bookId)
            .then(response => response.json())
            .then(reviews => {
                var reviewDiv = document.getElementById("reviews-" + bookId);
                reviewDiv.innerHTML = "<h4>Reviews:</h4>";
                reviews.forEach(function (review) {
                    reviewDiv.innerHTML += `<p>⭐ ${review.rating}/5 - ${review.review_text}</p>`;
                });
            });
    };


    fetchBooks();
});