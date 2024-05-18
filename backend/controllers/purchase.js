const Purchase = require("../models/PurchaseHistory");
const Book = require("../models/Book");
const User = require("../models/User");
const PurchaseIdCounter = require("../models/PurchaseIdCounter");

async function generatePurchaseId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const counter = await PurchaseIdCounter.findOneAndUpdate(
    { year, month },
    { $inc: { lastId: 1 } },
    { new: true, upsert: true }
  );

  return `${year}-${String(month).padStart(2, "0")}-${counter.lastId}`;
}

exports.createPurchase = async (req, res) => {
  const { bookId, userId, price, quantity } = req.body;
  try {
    const purchaseId = await generatePurchaseId();
    const purchase = await Purchase.create({
      purchaseId,
      bookId,
      userId,
      price,
      quantity,
    });

    const book = await Book.findById(bookId);
    book.sellCount += quantity;
    await book.save();

    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPurchaseHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const purchases = await Purchase.find({ userId })
      .populate("bookId", "title")
      .sort("-purchaseDate");
    res.json(purchases);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
