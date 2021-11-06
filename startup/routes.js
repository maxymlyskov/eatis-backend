const asyncError = require("../middleware/error");
const express = require("express");
const recipeSearch = require("../routes/recipeSearch");
const users = require("../routes/users");
const auth = require("../routes/auth");
const dayPlanner = require("../routes/dayPlanner");
const weekPlanner = require("../routes/weekPlanner");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api/recipeSearch", recipeSearch);
  app.use("/api/dayPlanner", dayPlanner);
  app.use("/api/weekPlanner", weekPlanner);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(asyncError);
};
