require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/models");
const URL = process.env.DATABASE_URL;
const rootRouter = require("./routes/index")
const cors = require("cors")

app.use(cors())
const app = express();

app.use(express.json());

mongoose
  .connect(URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to db\n" + err));

app.use("/api/v1",rootRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is ready to serve");
});
