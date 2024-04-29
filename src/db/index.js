// import mongoose from "mongoose";
const mongoose = require("mongoose");
// import { DB_NAME } from "../constants.js";
// import { DB_NAME } from "../../constants.js";
const { DB_NAME } = require("../constants.js");


const connectDB = async () => {
    try {
        // console.log(process.env.MONGODB_URI)
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST:`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

// export default connectDB

module.exports = connectDB;
