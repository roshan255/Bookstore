const Book = require("../models/Book");
const Purchase = require("../models/PurchaseHistory");

exports.createBook = async (req, res) => {
  const { bookId, title, description, price, authors } = req.body;
  try {
    const book = await Book.create({
      bookId,
      title,
      description,
      price,
      authors,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("authors", "name");
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSellCount = async (req, res) => {
  const { bookId, increment } = req.body;
  try {
    const book = await Book.findOne({ bookId });
    if (book) {
      book.sellCount += increment;
      await book.save();
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
