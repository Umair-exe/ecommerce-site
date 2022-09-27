const mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type:String,
        default: 'User',
    },
    avatar: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('User',UserSchema);