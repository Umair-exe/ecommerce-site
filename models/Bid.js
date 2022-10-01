const mongoose = require('mongoose');


const BidSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required:true,
    },
    offer: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model('BidSchema',BidSchema)