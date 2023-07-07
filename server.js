const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Product = require("./models/productModel");

const username = "root";
const password = "6VkOR49scvp1DZNz";
const collection_name = "NodeApi";

const PORT = 3000;

app.use(express.json());
/**
 *  parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
 */
app.use(express.urlencoded({ extended: false }));

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

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`Getting product with id: ${id}`);
  try {
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products", async (req, res) => {
  console.log("Getting all products");
  try {
    /**
     * Will get all the products of the database
     */
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * put is for the updates
 */
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Update product with id: ${id}`);
  try {
    /**
     * Will get a product with a given id and update it
     * It will also return a product if there was an update
     */
    const products = await Product.findByIdAndUpdate(id, req.body);
    /**
     * If no product found
     */
    if (!products) {
      return res
        .status(400)
        .json({ message: `Cannot find any product with ID: ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(`Adding a new product:${req.body}`);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

mongoose.set("strictQuery", false);

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
