const express = require("express");
const router = express.Router();
const {
  createPurchase,
  getPurchaseHistory,
} = require("../controllers/purchase");

router.get("/", (req, res) => {
  res.send("This is retail user page");
});
router.post("/purchase", createPurchase);
router.get("/:userId", getPurchaseHistory);

module.exports = router;
