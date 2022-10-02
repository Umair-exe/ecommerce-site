const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        type: String,
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
},
    {
        timestamps: true,
    }
);

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);