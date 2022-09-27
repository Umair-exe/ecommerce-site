const mongoose = require('mongoose');

const db = () => {
    mongoose.connect('mongodb+srv://umair_21:babayaga!1@cluster0.qnlgx.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('db is connected');
    })
    .catch(err => {
        console.log(err);
    }) 
}

module.exports = {db};