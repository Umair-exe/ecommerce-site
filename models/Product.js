const mongoose = require('mongoose');


const ProductsSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    quantity: {
        type: Number,
        default: 1,
    },
    image: String,
    
},{timestamps: true})


module.exports = mongoose.model('Product',ProductsSchema);