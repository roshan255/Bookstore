const expres = require("express");
const admin = require("./routes/admin");
const retail = require("./routes/retail");
const author = require("./routes/author");
const PORT = 5000;

app = expres();

app.use(expres.json());

app.use("/admin", admin);
app.use("/retail", retail);
app.use("/author", author);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
