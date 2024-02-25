const mongoose = require('mongoose');

URI ="mongodb://127.0.0.1:27017/mern_admin";


const connectDB = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Connect is succesfully");
    } catch (error) {
        console.error("error is occur "+error);
    }
};

module.exports = connectDB ;