const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/passport");
const auth = require("./routes/auth");
const connectDb = require("./db/connet");
require("dotenv").config();

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("./public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", auth);

const startServer = async () => {
  try {
    await connectDb().then(() => console.log("conneted to Database"));
    app.listen(process.env.PORT, () =>
      console.log(`server is running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
