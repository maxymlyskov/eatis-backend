const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { mealsSchema } = require("./meals");
const { nutrientsSchema } = require("./nutrients");

const mongoose = require("mongoose");

const weekPlannerSchema = new mongoose.Schema({
  data: { type: Object, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const WeekPlanner = mongoose.model("WeekPlanner", weekPlannerSchema);

function validateObject(result) {
  const schema = Joi.object({
    data: Joi.object().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
  });
  return schema.validate(result);
}

exports.weekPlannerSchema = weekPlannerSchema;
exports.WeekPlanner = WeekPlanner;
exports.validateObject = validateObject;
