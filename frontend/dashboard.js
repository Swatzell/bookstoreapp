
document.addEventListener("DOMContentLoaded", function () {
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    var ordersContainer = document.getElementById("orders");
    var reviewsContainer = document.getElementById("user-reviews");
    var bookListDropdown = document.getElementById("book-list");
    var submitReviewButton = document.getElementById("submit-review-btn");
    var logoutButton = document.getElementById("logout-btn");

    function getUserId() {
        var payload = JSON.parse(atob(token.split(".")[1]));
        return payload.id;
    }

    function fetchUserOrders() {
        fetch("http://localhost:3000/orders/" + getUserId(), {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(response => response.json())
        .then(orders => {
            ordersContainer.innerHTML = "<h3>Your Orders</h3>";
            orders.forEach(order => {
                ordersContainer.innerHTML += `<p>Order #${order.id} - ${order.total_price}$ (${order.status})</p>`;
            });
        });
    }

    function fetchUserReviews() {
        fetch("http://localhost:3000/reviews/user/" + getUserId(), {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(response => response.json())
        .then(reviews => {
            reviewsContainer.innerHTML = "<h3>Your Reviews</h3>";
            reviews.forEach(review => {
                reviewsContainer.innerHTML += `<p>⭐ ${review.rating}/5 - ${review.review_text} (Book ID: ${review.book_id})</p>`;
            });
        });
    }

    function fetchBooks() {
        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(books => {
                bookListDropdown.innerHTML = "";
                books.forEach(book => {
                    var option = document.createElement("option");
                    option.value = book.id;
                    option.textContent = book.title;
                    bookListDropdown.appendChild(option);
                });
            });
    }

    submitReviewButton.addEventListener("click", function () {
        var book_id = bookListDropdown.value;
        var rating = document.getElementById("rating").value;
        var review_text = document.getElementById("review-text").value;

        fetch("http://localhost:3000/reviews/add", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                book_id,
                user_id: getUserId(),
                rating,
                review_text
            })
        })
        .then(response => response.json())
        .then(() => {
            alert("Review submitted!");
            fetchUserReviews(); 
        })
        .catch(() => alert("Failed to submit review"));
    });

    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    fetchUserOrders();
    fetchUserReviews();
    fetchBooks();
});