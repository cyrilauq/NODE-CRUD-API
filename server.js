const express = require("express");
const app = express();

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
  res.send("Hello from NODE API");
});

app.listen(PORT, () => {
  console.log(`Node API is running on port: ${PORT}`);
});
