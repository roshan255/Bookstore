const express = require("express");
const router = express.Router();
const ensureRole = require("../middleware/roleCheck");

router.get("/", ensureRole("retail"), (req, res) => {
  res.send("This is retail user page");
});

module.exports = router;
