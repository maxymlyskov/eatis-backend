const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");

const ingridientsSearchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  id: {
    type: Number,
    required: true,
    maxLength: 50,
  },
  image: {
    type: String,
    required: true,
    maxLength: 200,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const IngridientsSearch = mongoose.model(
  "IngridientsSearch",
  ingridientsSearchSchema
);

function validateObject(result) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    id: Joi.number().required(),
    image: Joi.string().required(),
  });
  return schema.validate(result);
}

exports.ingridientsSearchSchema = ingridientsSearchSchema;
exports.IngridientsSearch = IngridientsSearch;
exports.validateObject = validateObject;
