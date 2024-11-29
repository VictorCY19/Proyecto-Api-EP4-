const mongoose = require('mongoose');

const platilloSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
});

module.exports = mongoose.model('Dish', platilloSchema);
