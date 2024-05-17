const purchaseHistorySchema = new mongoose.Schema({
  purchaseId: { type: String, unique: true, required: true },
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const PurchaseHistory = mongoose.model(
  "PurchaseHistory",
  purchaseHistorySchema
);