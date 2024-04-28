const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const routes = require('../src/routes/route');

app.use(express.json());
app.use(cors()); // Use the cors middleware


// async function mongodbconnect(){

//   try{
// await mongoose.connect('mongodb+srv://singhchauhangautam:SPHuwGUn9jzlSHSK@cluster0.xfjsfby.mongodb.net/nodejs', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   }catch {

//     console.log('Failed to connect to MongoDB');

//   }
// }

// mongodbconnect();

// Connect to MongoDB
mongoose.connect('mongodb+srv://singhchauhangautam:SPHuwGUn9jzlSHSK@cluster0.xfjsfby.mongodb.net/nodejs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Routes
app.use('/', routes);

// Start the server
const port = 4050;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
