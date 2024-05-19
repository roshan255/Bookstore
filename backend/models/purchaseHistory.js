const mongoose = require("mongoose");
const purchaseHistorySchema = new mongoose.Schema({
  purchaseId: { type: String, unique: true, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  purchaseDate: { type: Date, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const PurchaseHistory = mongoose.model(
  "PurchaseHistory",
  purchaseHistorySchema
);

module.exports = PurchaseHistory;
