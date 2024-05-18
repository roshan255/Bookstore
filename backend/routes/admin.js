const express = require("express");
const router = express.Router();
const ensureRole = require("../middleware/roleCheck");

router.get("/", ensureRole("admin"), (req, res) => {
  res.send("This is admin page");
});

module.exports = router;
