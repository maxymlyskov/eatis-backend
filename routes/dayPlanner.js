const express = require("express");
const route = express.Router();
const { DayPlanner, validateObject } = require("../models/dayPlanner");
const auth = require("../middleware/auth");

route.get("/", async (req, res) => {
  const dayPlanner = await DayPlanner.find();
  res.send(dayPlanner);
});

route.post(
  "/",
  /*auth,*/ async (req, res) => {
    const { error } = validateObject(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const dayPlanner = new DayPlanner({
      meals: req.body.meals,
      // nutrients: req.body.nutrients,
      // owner: req.user._id,
    });
    try {
      await dayPlanner.save();
      return res.send(dayPlanner);
    } catch (error) {
      res.send(error);
    }
  }
);

route.put("/:id", auth, async (req, res) => {
  const { error } = validateObject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const dayPlanner = await DayPlanner.findByIdAndUpdate(
    req.params.id,
    { $push: { meals: req.body.meals } },
    { new: true }
  );

  if (!dayPlanner) return res.status(404).send("This page is not found!");

  res.send(dayPlanner);
});

route.delete("/:id/:mealId", auth, async (req, res) => {
  const dayPlanner = await DayPlanner.findByIdAndUpdate(
    req.params.id,
    { $pull: { meals: { id: req.params.mealId } } },
    { multi: false }
  );
  if (!dayPlanner) return res.status(404).send("This page is not found!");

  res.send(dayPlanner);
});

route.delete("/", async (req, res) => {
  const dayPlanner = await DayPlanner.deleteMany({});

  if (!dayPlanner) return res.status(404).send("This page is not found!");

  res.send(dayPlanner);
});

module.exports = route;
