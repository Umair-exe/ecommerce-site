const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log('db is connected');
    })
    .catch(err => {
        console.log(err);
    }) 
}

module.exports = {db};