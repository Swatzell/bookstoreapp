document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(books => {
            var container = document.getElementById("books");
            books.forEach(book => {
                var div = document.createElement("div");
                div.innerHTML = "<h3>" + book.title + "</h3><p>" + book.author + "</p><p>$" + book.price + "</p>";
                container.appendChild(div);
            });
        });
});