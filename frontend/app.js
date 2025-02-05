document.addEventListener("DOMContentLoaded", function () {
    var booksContainer = document.getElementById("books-container");
    var loginButton = document.getElementById("login-btn");

    
    loginButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });

    function fetchBooks() {
        fetch("/books")
            .then(response => response.json())
            .then(books => {
                booksContainer.innerHTML = "";
                books.forEach(function (book) {
                    var bookCard = document.createElement("div");
                    bookCard.className = "book-card";
                    bookCard.innerHTML = `
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p><strong>Genre:</strong> ${book.genre}</p>
                        <p><strong>Price:</strong> $${book.price}</p>
                        <button class="review-btn" data-book-id="${book.id}">View Reviews</button>
                        <div id="reviews-${book.id}" class="reviews-container"></div>
                    `;
                    booksContainer.appendChild(bookCard);
                });

                
                document.querySelectorAll(".review-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        var bookId = this.getAttribute("data-book-id");
                        viewReviews(bookId);
                    });
                });
            })
            .catch(error => {
                booksContainer.innerHTML = "<p>Error loading books.</p>";
                console.error("Error fetching books:", error);
            });
    }

    function viewReviews(bookId) {
        var reviewContainer = document.getElementById("reviews-" + bookId);

        if (reviewContainer.style.display === "block") {
            reviewContainer.style.display = "none";
            return;
        }

        fetch(`/books/reviews/${bookId}`)
            .then(response => response.json())
            .then(reviews => {
                reviewContainer.innerHTML = "<h4>Reviews:</h4>";
                if (reviews.length === 0) {
                    reviewContainer.innerHTML += "<p>No reviews yet.</p>";
                } else {
                    reviews.forEach(review => {
                        reviewContainer.innerHTML += `<p>⭐ ${review.rating}/5 - ${review.review_text}</p>`;
                    });
                }
                reviewContainer.style.display = "block";
            })
            .catch(error => console.error("Error fetching reviews:", error));
    }

    fetchBooks();
});