const fs = require("fs"); // import fs module
const path = require("path"); // import path module

const express = require("express"); // import express

const app = express(); // initialize express

app.set("views", path.join(__dirname, "views")); // set views directory (default: views directory in root folder of project directory)
app.set("view engine", "ejs"); // set view engine to ejs (embedded javascript templating)

app.use(express.static("public")); // use middleware
app.use(express.urlencoded({ extended: true })); // use middleware

// app.get("/", function (req, res) {
//   res.send("<h1>Hello!</h1>");
// });

app.get("/", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/recommend", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
  res.render("confirm");
});

app.get("/about", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // res.sendFile(htmlFilePath);
  res.render("about");
});

app.listen(3000); // listen for requests on port 3000
