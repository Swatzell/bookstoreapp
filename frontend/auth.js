function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    })
    .catch(() => alert("Login failed"));
}