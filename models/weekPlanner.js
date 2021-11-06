const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { mealsSchema } = require("./meals");
const { nutrientsSchema } = require("./nutrients");

const mongoose = require("mongoose");

const weekPlannerSchema = new mongoose.Schema({
  week: {
    monday: {
      meals: [{ type: mealsSchema }],
      nutrients: { type: nutrientsSchema },
    },
    tuesday: {
      meals: [{ type: mealsSchema }],
      nutrients: { type: nutrientsSchema },
    },
    wednesday: {
      meals: [{ type: mealsSchema }],
      nutrients: { type: nutrientsSchema },
    },
    thursday: {
      meals: [{ type: mealsSchema }],
      nutrients: { type: nutrientsSchema },
    },
    friday: {
      meals: [{ type: mealsSchema }],
      nutrients: { type: nutrientsSchema },
    },
    saturday: {
      meals: [{ type: mealsSchema }],
      nutrients: { type: nutrientsSchema },
    },
    sunday: {
      meals: [{ type: mealsSchema }],
      nutrients: { type: nutrientsSchema },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const WeekPlanner = mongoose.model("WeekPlanner", weekPlannerSchema);

function validateObject(result) {
  const schema = Joi.object({
    week: Joi.object().required(),
  });
  return schema.validate(result);
}

exports.weekPlannerSchema = weekPlannerSchema;
exports.WeekPlanner = WeekPlanner;
exports.validateObject = validateObject;
