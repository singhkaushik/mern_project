require('dotenv').config();
const mongoose = require("mongoose");

const Db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is Connected");
    } catch (error) {
        console.error("Database Connection Error:", error);
    }
};

module.exports = Db;
