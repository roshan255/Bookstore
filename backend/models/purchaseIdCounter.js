const mongoose = require("mongoose");

const purchaseIdCounterSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  lastId: { type: Number, default: 0 },
});

purchaseIdCounterSchema.index({ year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("PurchaseIdCounter", purchaseIdCounterSchema);
