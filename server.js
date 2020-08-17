const express = require("express");
const connectDB = require("./config/db");
const app = express();
//connect Database
connectDB();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.json({msg: "Welcome to Contact Keeper API"}));
//Defines routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}`);
});
