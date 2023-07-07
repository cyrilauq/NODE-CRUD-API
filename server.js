const express = require("express");
const mongoose = require("mongoose");
const app = express();

const username = "root";
const password = "6VkOR49scvp1DZNz";
const collection_name = "NodeApi";

const PORT = 3000;

// Define all the routes

/**
 * req == request made to the api
 * res == response madi by the api
 */
app.get("/", (req, res) => {
  res.send("Hello from NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog from NODE API");
});

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@crud-api.scdzuyk.mongodb.net/${collection_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
