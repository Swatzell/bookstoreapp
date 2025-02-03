var express = require("express");
var path = require("path");
var app = express();


var staticPath = path.join(__dirname, "../frontend");
console.log("Serving static files from:", staticPath);


app.use(express.static(staticPath));


app.get("/", function (req, res) {
  res.sendFile(path.join(staticPath, "index.html"));
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server running on port " + port);
});