const Joi = require("joi");
const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  weight: {
    type: Number,
    required: true,
    max: 300,
    min: 30,
  },
  height: {
    type: Number,
    required: true,
    max: 300,
    min: 30,
  },
  goal: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  activity: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      weight: this.weight,
      height: this.height,
      goal: this.goal,
      birthDate: this.birthDate,
      gender: this.gender,
      activity: this.activity,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateObject(result) {
  const complexityOptions = {
    min: 8,
    max: 1024,
    lowerCase: 1,
    numeric: 1,
    requirementCount: 2,
  };

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    gender: Joi.string().min(3).max(50).required(),
    goal: Joi.string().min(3).max(50).required(),
    activity: Joi.string().min(3).max(50).required(),
    weight: Joi.number().required(),
    height: Joi.number().required(),
    birthDate: Joi.date().required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(result);
}

exports.User = User;
exports.validateObject = validateObject;
