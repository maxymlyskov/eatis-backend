const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { mealsSchema } = require("./meals");
const { nutrientsSchema } = require("./nutrients");

const mongoose = require("mongoose");

const dayPlannerSchema = new mongoose.Schema({
  meals: [{ type: mealsSchema }],
  title: { type: String },
  image: { type: String },
  // nutrients: { type: nutrientsSchema },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const DayPlanner = mongoose.model("DayPlanner", dayPlannerSchema);

function validateObject(result) {
  const schema = Joi.object({
    meals: Joi.array().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    // nutrients: Joi.object().required(),
  });
  return schema.validate(result);
}

exports.dayPlannerSchema = dayPlannerSchema;
exports.DayPlanner = DayPlanner;
exports.validateObject = validateObject;
