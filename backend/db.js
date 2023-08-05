const mongoose = require("mongoose");
require("dotenv").config()
//const mongoURI = process.env.MONGO_URI;
const mongoURI = "mongodb+srv://Rishika:taylorswift@cluster0.acug8d2.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}
module.exports = connectToMongo
