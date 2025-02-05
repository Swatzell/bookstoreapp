var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());


app.use("/books", require("./routes/books"));
app.use("/users", require("./routes/users"));
app.use("/reviews", require("./routes/reviews"));
app.use("/orders", require("./routes/orders"));
var path = require("path");
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server running on port " + port);
});
