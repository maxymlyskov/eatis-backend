const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");

const nutrientsSchema = new mongoose.Schema({
  calories: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
});

const Nutrients = mongoose.model("Nutrients", nutrientsSchema);

function validateObject(result) {
  const schema = Joi.object({
    calories: Joi.number().required(),
    carbohydrates: Joi.number().required(),
    fat: Joi.number().required(),
    protein: Joi.number().required(),
  });
  return schema.validate(result);
}

exports.nutrientsSchema = nutrientsSchema;
exports.Nutrients = Nutrients;
exports.validateObject = validateObject;
