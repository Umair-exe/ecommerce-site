const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [Object],
})

module.exports = mongoose.model("Cart",cartSchema);