const Purchase = require("../models/PurchaseHistory");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

exports.sendRevenueEmails = async (req, res) => {
  try {
    const authors = await User.find({ role: "author" });
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    for (let author of authors) {
      const purchases = await Purchase.find({ authors: author._id });
      console.log(purchases);
      const totalRevenue = purchases.reduce(
        (acc, purchase) => acc + purchase.price * purchase.quantity,
        0
      );

      const message = `Dear ${author.name},\n\nYour revenue details for the current month and year are as follows:\nCurrent Month: ${currentMonth}\nCurrent Year: ${currentYear}\nTotal Revenue: $${totalRevenue}\n\nBest regards,\nBook Store Team`;

      await sendEmail({
        to: author.email,
        subject: "Revenue Details",
        text: message,
      });
    }

    res.json({ message: "Revenue emails sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
