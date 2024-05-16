const expres = require("express");
const admin = require("./routes/admin");
const retail = require("./routes/retail");
const author = require("./routes/author");
const connectDb = require("./db/connet");
require("dotenv").config();
const PORT = 5000;

app = expres();

app.use(expres.json());

app.use("/admin", admin);
app.use("/retail", retail);
app.use("/author", author);

const startServer = async () => {
  try {
    await connectDb().then(() => console.log("conneted to DataBase"));
    app.listen(process.env.PORT, () =>
      console.log(`server is running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
