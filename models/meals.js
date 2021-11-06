const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");

const mealsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  readyInMinutes: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
});

const Meals = mongoose.model("Meals", mealsSchema);

function validateObject(result) {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    readyInMinutes: Joi.number().required(),
    servings: Joi.number().required(),
  });
  return schema.validate(result);
}

exports.mealsSchema = mealsSchema;
exports.Meals = Meals;
exports.validateObject = validateObject;
