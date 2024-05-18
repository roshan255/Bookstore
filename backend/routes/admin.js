const express = require("express");
const router = express.Router();
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

module.exports = router;
