const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");

const recipeSearchSchema = new mongoose.Schema({
  title: {
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

const RecipeSearch = mongoose.model("RecipeSearch", recipeSearchSchema);

function validateObject(result) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    id: Joi.number().required(),
    image: Joi.string().required(),
  });
  return schema.validate(result);
}

exports.recipeSearchSchema = recipeSearchSchema;
exports.RecipeSearch = RecipeSearch;
exports.validateObject = validateObject;
