const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { mealsSchema } = require("./meals");
const { nutrientsSchema } = require("./nutrients");

const mongoose = require("mongoose");

const dayPlannerSchema = new mongoose.Schema({
  meals: [{ type: mealsSchema }],
  // nutrients: { type: nutrientsSchema },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
});

const DayPlanner = mongoose.model("DayPlanner", dayPlannerSchema);

function validateObject(result) {
  const schema = Joi.object({
    meals: Joi.array().required(),
    // nutrients: Joi.object().required(),
  });
  return schema.validate(result);
}

exports.dayPlannerSchema = dayPlannerSchema;
exports.DayPlanner = DayPlanner;
exports.validateObject = validateObject;
