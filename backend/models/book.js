const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: { type: String, unique: true, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  title: { type: String, unique: true, required: true },
  description: { type: String },
  price: { type: Number, min: 100, max: 1000, required: true },
  sellCount: { type: Number, default: 0 },
});
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
