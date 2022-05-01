var config = require('./Config/config');
const mongoose = require("mongoose");

mongoose.connect(config.dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});