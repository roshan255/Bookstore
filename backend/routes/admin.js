const express = require("express");
const router = express.Router();
const { sendRevenueEmails } = require("../controllers/revenue");
const {
  createBook,
  getBooks,
  updateSellCount,
} = require("../controllers/book");

router.get("/", (req, res) => {
  res.send("This is admin page");
});
router.post("/books", createBook);
router.get("/books", getBooks);
router.put("/sellCount", updateSellCount);
router.post("/sendRevenueEmails", sendRevenueEmails);

module.exports = router;
