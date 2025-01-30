var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());


app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));
app.use("/orders", require("./routes/orders"));

app.listen(3000, function () {
    console.log("Server running on http://localhost:3000");
});