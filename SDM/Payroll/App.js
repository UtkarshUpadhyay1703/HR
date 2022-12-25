const express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var routes = require("./routes/routers");
mongoose.promise = global.promise;//to connect node.js with mongodb server;
const url = 'mongodb://0.0.0.0:27017/test'

mongoose.connect(url, { connectTimeoutMS: 1000 }, function (err, result) {
    if (err) {
        console.log("Error happened");
    } else {
        console.log("Connection done with mongo");
    }
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(function (req, resp, next) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
    resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    resp.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

app.use("/", routes);

app.listen(4000);
console.log("Server started at port 4000");
module.exports = app;