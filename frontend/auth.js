document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html";
            } else {
                document.getElementById("error-message").textContent = "Invalid email or password.";
            }
        })
        .catch(() => {
            document.getElementById("error-message").textContent = "Login failed. Try again.";
        });
    });
});
