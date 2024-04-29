const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('../src/routes/route');
const process = require('process');
const connectDB = require('../src/db/index');

require('dotenv').config();

// console.log(process.env); // Debugging statement to see all environment variables

app.use(express.json());
app.use(cors()); // Use the cors middleware

// Connect to MongoDB
connectDB()
  .then(() => {
    const port = process.env.PORT || 8000; // Default to 8000 if PORT is not defined
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

// Routes
app.use('/', routes);
