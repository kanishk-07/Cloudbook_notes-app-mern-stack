const mongoose = require('mongoose');

const mongoURI = process.env.REACT_APP_MONGO_PROD_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("connected to MongoDB successfully");
    })
};

module.exports = connectToMongo;