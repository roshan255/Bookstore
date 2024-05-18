const express = require("express");
const router = express.Router();
const ensureRole = require("../middleware/roleCheck");

router.get("/", ensureRole("author"), (req, res) => {
  res.send("This is author page");
});

module.exports = router;
