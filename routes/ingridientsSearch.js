const express = require("express");
const route = express.Router();
const {
  ingridientsSearch,
  validateObject,
} = require("../models/ingridientsSearch");
const auth = require("../middleware/auth");

route.get("/", auth, async (req, res) => {
  const ingridientsSearch = await ingridientsSearch.find({
    owner: req.user._id,
  });
  res.send(ingridientsSearch);
});

route.get("/:id", async (req, res) => {
  const ingridientsSearch = await ingridientsSearch.findById(req.params.id);
  if (!ingridientsSearch)
    return res.status(404).send("This page is not found!");
  res.send(ingridientsSearch);
});

route.post("/", auth, async (req, res) => {
  const { error } = validateObject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const ingridientsSearch = new ingridientsSearch({
    name: req.body.name,
    id: req.body.id,
    image: req.body.image,
    owner: req.user._id,
  });
  try {
    await ingridientsSearch.save();
    return res.send(ingridientsSearch);
  } catch (error) {
    res.send(error);
  }
});

route.delete("/:id", auth, async (req, res) => {
  const ingridientsSearch = await ingridientsSearch.findByIdAndRemove(
    req.params.id
  );

  if (!ingridientsSearch)
    return res.status(404).send("This page is not found!");

  res.send(ingridientsSearch);
});

route.delete("/", async (req, res) => {
  const ingridientsSearch = await ingridientsSearch.deleteMany({});

  if (!ingridientsSearch)
    return res.status(404).send("This page is not found!");

  res.send(ingridientsSearch);
});

module.exports = route;
