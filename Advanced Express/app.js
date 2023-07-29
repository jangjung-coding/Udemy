const path = require("path"); // import path module

const express = require("express"); // import express

const defaultRoutes = require("./routes/default"); // import functions from default.js
const restaurantRoutes = require("./routes/restaurants"); // import functions from restaurants.js 

const app = express(); // initialize express

app.set("views", path.join(__dirname, "views")); // set views directory (default: views directory in root folder of project directory)
app.set("view engine", "ejs"); // set view engine to ejs (embedded javascript templating)

app.use(express.static("public")); // use middleware
app.use(express.urlencoded({ extended: false })); // use middleware

app.use('/', defaultRoutes); // use middleware

app.use('/', restaurantRoutes); // use middleware

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000); // listen for requests on port 3000
