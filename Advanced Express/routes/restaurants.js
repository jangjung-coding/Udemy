const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant_data"); // import functions from restaurant_data.js

const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") { 
    nextOrder = "asc";
  }

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resA.name > resB.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: order,
  });
});

router.get("/restaurants/:id", function (req, res) {
  // :id is a route parameter
  const restaurantId = req.params.id; // get the value of the route parameter
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant_detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant);

  resData.storeRestaurants(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
  res.render("confirm");
});

module.exports = router;
