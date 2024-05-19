const Purchase = require("../models/PurchaseHistory");
const Book = require("../models/Book");
const User = require("../models/User");
const PurchaseIdCounter = require("../models/PurchaseIdCounter");
const sendEmail = require("../utils/sendEmail");

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

async function notifyAuthors(book) {
  const authors = await User.find({ _id: { $in: book.authors } });
  const emails = authors.map((author) => author.email);
  const subject = `New Sale: ${book.title}`;
  const text = `Dear Author,\n\nYour book "${book.title}" has been sold!\n\nBest regards,\nBook Store Team`;

  for (const email of emails) {
    await sendEmail({ to: email, subject, text });
  }
}

exports.createPurchase = async (req, res) => {
  const { bookId, userId, price, quantity } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const authors = book.authors;

    const purchaseId = await generatePurchaseId();
    const purchase = await Purchase.create({
      purchaseId,
      bookId,
      userId,
      authors,
      price,
      quantity,
      purchaseDate: new Date(),
    });

    book.sellCount += quantity;
    await book.save();
    await notifyAuthors(book);

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
