const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const productRoutes = require("./routes/productRoutes.js")

const compass_string = "mongodb://localhost:27017/cohort8_db";
const atlas_string = "mongodb+srv://Adeyemidb_user:dBuTJpVdkAsCmaae@cluster0.6cs46ar.mongodb.net/?appName=Cluster0";

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

mongoose.connect(atlas_string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();
const PORT = 5555;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/users", userRoute)
app.use("/products", productRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});