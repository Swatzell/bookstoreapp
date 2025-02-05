document.addEventListener("DOMContentLoaded", function () {
  var closeBtn = document.getElementById("modal-cancel-review");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeReviewModal);
  }
  var token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  var booksContainer = document.getElementById("books-container");
  var ordersContainer = document.getElementById("orders");
  var reviewsContainer = document.getElementById("user-reviews");
  var logoutButton = document.getElementById("logout-btn");

  function getUserId() {
    var payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  }

  function fetchBooks() {
    fetch("/books")
      .then((response) => response.json())
      .then((books) => {
        booksContainer.innerHTML = "";
        books.forEach((book) => {
          var bookDiv = document.createElement("div");
          bookDiv.className = "book";
          bookDiv.innerHTML = `
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p><strong>Genre:</strong> ${book.genre}</p>
                        <p><strong>Price:</strong> $${book.price}</p>
                        <p><strong>Stock:</strong> <span class="stock-count">${book.stock_quantity}</span></p>
                        <button class="order-button" data-book-id="${book.id}" data-price="${book.price}">Order Now</button>
                        <button class="review-button" data-book-id="${book.id}" data-book-title="${book.title}">Write Review</button>
                    `;
          booksContainer.appendChild(bookDiv);
        });

        document.querySelectorAll(".order-button").forEach((button) => {
          button.addEventListener("click", function () {
            var bookId = this.getAttribute("data-book-id");
            var price = this.getAttribute("data-price");
            placeOrder(bookId, price);
          });
        });

        document.querySelectorAll(".review-button").forEach((button) => {
          button.addEventListener("click", function () {
            var bookId = this.getAttribute("data-book-id");
            var bookTitle = this.getAttribute("data-book-title");
            openReviewModal(bookId, bookTitle);
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        booksContainer.innerHTML = "<p>Error loading books.</p>";
      });
  }
  function placeOrder(bookId, price) {
    var userId = getUserId();

    fetch("/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        total_price: price,
        items: [{ book_id: bookId, quantity: 1, price: price }],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Error placing order: " + data.error);
          return;
        }
        alert("Order placed successfully!");

        updateStockCount(bookId);

        fetchUserOrders();
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order.");
      });
  }
  function fetchUserOrders() {
    fetch("/orders/user/" + getUserId(), {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((orders) => {
        ordersContainer.innerHTML = "<h3>Your Orders</h3>";
        if (orders.length === 0) {
          ordersContainer.innerHTML += "<p>No orders yet.</p>";
          return;
        }
        orders.forEach((order) => {
          ordersContainer.innerHTML += `<p>📚 <strong>${
            order.book_title || "Unknown Book"
          }</strong> - Quantity: ${order.quantity} - Total: $${
            order.total_price
          } (${order.status})</p>`;
        });
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }
  function updateStockCount(bookId) {
    var bookElement = document.querySelector(
      `.order-button[data-book-id="${bookId}"]`
    );
    if (bookElement) {
      var stockElement = bookElement.parentElement.querySelector(
        "p strong.stock-count"
      );
      if (stockElement) {
        let currentStock = parseInt(stockElement.innerText, 10);
        if (currentStock > 0) {
          stockElement.innerText = currentStock - 1;
        }
      }
    }
  }

  function fetchUserReviews() {
    fetch("/reviews/user/" + getUserId(), {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => response.json())
      .then((reviews) => {
        reviewsContainer.innerHTML = "<h3>Your Reviews</h3>";
        if (reviews.length === 0) {
          reviewsContainer.innerHTML += "<p>No reviews yet.</p>";
          return;
        }
        reviews.forEach((review) => {
          reviewsContainer.innerHTML += `<p>⭐ ${review.rating}/5 - ${review.review_text} <strong>(${review.book_title})</strong></p>`;
        });
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }

  function openReviewModal(bookId, bookTitle) {
    var modal = document.getElementById("review-modal");
    modal.style.display = "flex";
    document.getElementById("modal-book-title").innerText = bookTitle;

    document.getElementById("modal-submit-review").onclick = function () {
      submitReview(bookId);
    };
  }

  function closeReviewModal() {
    var modal = document.getElementById("review-modal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  function submitReview(bookId) {
    var rating = document.getElementById("modal-rating").value;
    var reviewText = document.getElementById("modal-review-text").value;

    if (!rating || !reviewText) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    fetch("/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        book_id: bookId,
        user_id: getUserId(),
        rating,
        review_text: reviewText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Error submitting review: " + data.error);
          return;
        }
        alert("Review submitted!");
        closeReviewModal();
        fetchUserReviews();
      })
      .catch(() => alert("Failed to submit review"));
  }

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

  fetchBooks();
  fetchUserOrders();
  fetchUserReviews();
});
