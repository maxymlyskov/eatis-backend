const express = require("express");
const route = express.Router();
const { WeekPlanner, validateObject } = require("../models/weekPlanner");
const auth = require("../middleware/auth");

route.get("/", auth, async (req, res) => {
  const weekPlanner = await WeekPlanner.find({ owner: req.user._id });
  res.send(weekPlanner);
});

route.post("/", auth, async (req, res) => {
  const { error } = validateObject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const weekPlanner = new WeekPlanner({
    week: req.body.week,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday,
    owner: req.user._id,
  });
  try {
    await weekPlanner.save();
    return res.send(weekPlanner);
  } catch (error) {
    res.send(error);
  }
});

route.put("/:id/:day", auth, async (req, res) => {
  const { error } = validateObject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const weekPlanner = await WeekPlanner.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        [`week.${req.params.day}.meals`]: req.body.week.monday.meals[0],
      },
    },
    { arrayFilters: [{ day: req.params.day }], new: true }
  );

  if (!weekPlanner) return res.status(404).send("This page is not found!");

  res.send(weekPlanner);
});

route.delete("/:id/:day/:mealId", auth, async (req, res) => {
  const weekPlanner = await WeekPlanner.findByIdAndUpdate(
    req.params.id,
    { $pull: { [`week.${req.params.day}.meals`]: { id: req.params.mealId } } },
    { multi: false, new: true }
  );
  if (!weekPlanner) return res.status(404).send("This page is not found!");

  console.log(weekPlanner.week.friday.meals.length);
  res.send(weekPlanner.week.friday);
});

route.delete("/", async (req, res) => {
  const weekPlanner = await WeekPlanner.deleteMany({});

  if (!weekPlanner) return res.status(404).send("This page is not found!");

  res.send(recipeSearch);
});

module.exports = route;
