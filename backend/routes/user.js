const express = require("express");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const router = express.Router();

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "Incorrect Inputs" });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({ token: token });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

module.exports = router;
