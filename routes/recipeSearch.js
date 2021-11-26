const express = require("express");
const route = express.Router();
const { RecipeSearch, validateObject } = require("../models/recipeSearch");
const auth = require("../middleware/auth");

route.get("/wall", async (req, res) => {
  const recipesSearch = await RecipeSearch.find();
  res.send(recipesSearch);
});

route.get("/", auth, async (req, res) => {
  const recipesSearch = await RecipeSearch.find({ owner: req.user._id });
  res.send(recipesSearch);
});

route.get("/:id", async (req, res) => {
  const recipeSearch = await RecipeSearch.findById(req.params.id);
  if (!recipeSearch) return res.status(404).send("This page is not found!");
  res.send(recipeSearch);
});

route.post("/", auth, async (req, res) => {
  const { error } = validateObject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const recipeSearch = new RecipeSearch({
    title: req.body.title,
    id: req.body.id,
    calories: req.body.calories,
    fat: req.body.fat,
    protein: req.body.protein,
    image: req.body.image,
    carbs: req.body.carbs,
    owner: req.user._id,
  });
  try {
    await recipeSearch.save();
    return res.send(recipeSearch);
  } catch (error) {
    res.send(error);
  }
});

route.delete("/:id", auth, async (req, res) => {
  const recipeSearch = await RecipeSearch.findByIdAndRemove(req.params.id);

  if (!recipeSearch) return res.status(404).send("This page is not found!");

  res.send(recipeSearch);
});

route.delete("/", async (req, res) => {
  const recipeSearch = await RecipeSearch.deleteMany({});

  if (!recipeSearch) return res.status(404).send("This page is not found!");

  res.send(recipeSearch);
});

module.exports = route;
