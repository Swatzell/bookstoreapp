document.addEventListener("DOMContentLoaded", function () {
    var booksContainer = document.getElementById("books");
    var cart = [];

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

    window.addToCart = function (bookId, title, price) {
     var item = cart.find(item => item.bookId === bookId);
     if (item) {
         item.quantity++;
     } else {
         cart.push({ bookId: bookId, title: title, price: price, quantity: 1 });
     }
     updateCartDisplay();
    };

    function updateCartDisplay() {
        var cartContainer = document.getElementById("cart");
        cartContainer.innerHTML = "<h2>Cart</h2>";
        cart.forEach(function (item, index) {
            var itemDiv = document.createElement("div");
            cartContainer.innerHTML = `
                <p>${item.title} - $${item.price} x ${item.quantity}
                <button onclick="removeFromCart(${index})">Remove</button></p>
            `;
            cartContainer.appendChild(itemDiv);
        });
    }

    window.removeFromCart = function (index) {
        cart[index].quantity--;
        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    };

    fetchBooks();
});