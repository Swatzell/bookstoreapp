document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("error-message").innerText = data.error;
        } else {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html";
        }
    })
    .catch(() => {
        document.getElementById("error-message").innerText = "Registration failed.";
    });
});