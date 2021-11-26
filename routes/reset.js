const { User } = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const route = express.Router();

route.post("/", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    const salt = await bcrypt.genSalt(3);
    let token = await bcrypt.hash(req.body.email, salt);
    let tokenUpdated = token.replace(/\//g, "|");

    await sendEmail(user.email, "Password reset", tokenUpdated);
    console.log(tokenUpdated);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

route.post("/:email/:token", async (req, res) => {
  try {
    const { email, token } = req.params;
    const emailUpdated = token.replace(/\|/g, "/");
    const verified = await bcrypt.compare(email, emailUpdated);
    console.log(emailUpdated, token);
    if (!verified) res.send("Wrong token");
    else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const userPassword = await User.findOneAndUpdate(
        { email: email },
        { password: password },
        { new: true }
      );

      res.send(userPassword);
    }
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

module.exports = route;
