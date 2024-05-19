const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const author = require("./author");
const admin = require("./admin");
const retail = require("./retail");
const router = express.Router();
const ensureRole = require("../middleware/roleCheck");

router.post("/register", async (req, res) => {
  try {
    const { userId, name, email, password, role } = req.body;
    const user = new User({ userId, name, email, password, role });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  switch (req.user.role) {
    case "admin":
      res.redirect("/admin");
      break;
    case "author":
      res.redirect("/author");
      break;
    case "retail":
      res.redirect("/retail");
      break;
    default:
      res.redirect("/login");
  }
});
router.use("/admin", ensureRole("admin"), admin);
router.use("/retail", ensureRole("retail"), retail);
router.use("/author", ensureRole("author"), author);

module.exports = router;
