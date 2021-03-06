var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");

var apiRouter = require("./routes/api");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", apiRouter);

app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;
