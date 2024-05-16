const mongodb = require("mongoose");
require("dotenv").config();
const connectDb = () => {
  return mongodb.connect(process.env.MONGO_URI);
};

module.exports = connectDb;
