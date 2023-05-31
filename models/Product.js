const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
    studio: String,
    name: String,
    price: Number
})

module.exports = Product;
