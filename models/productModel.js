const mongoose = require("mongoose");

/**
 * Schema is the same as table, so we create the table.
 * To do that we give an object, each property of the object is a column
 * Then we give to each property an object, to tell its type, if it's require or not...
 * required take a table as a value, first a boolean, second the message to display if the boolean is not respected
 */
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
