const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const reportRoute = require("./routes/reportRoute");
const cities = require("./db/cities.json");

// api config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// db config
mongoose.connect(process.env.MONGOURL, () => {
  try {
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
});

// api endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    about: "This is a simple API for reporting crime",
    author: "Arslan iftikhar",
  });
});

app.get("/cities", async (req, res) => {
  res.send(cities);
});

app.use("/api/v1", userRoute);
app.use("/api/v1", reportRoute);

// listner
app.listen(port, () => {
  console.log(`api working ${port}`);
});
