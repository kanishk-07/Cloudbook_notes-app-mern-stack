const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook';

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("connected to MongoDB successfully");
    })
};

module.exports = connectToMongo;