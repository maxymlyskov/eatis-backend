const { User } = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");

route.post("/", auth, async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    const salt = await bcrypt.genSalt(3);
    let token = await bcrypt.hash(req.user._id, salt);

    await sendEmail(user.email, "Password reset", token);
    console.log(token);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

route.post("/:id/:token", auth, async (req, res) => {
  try {
    const { id, token } = req.params;
    const verified = await bcrypt.compare(id, token);
    console.log(id, token);
    if (!verified) res.send("Wrong token");
    else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const userPassword = await User.findByIdAndUpdate(
        id,
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
