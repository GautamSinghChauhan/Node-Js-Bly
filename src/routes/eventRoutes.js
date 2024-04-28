const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const eventController = require('../controller/EventsController');

// Multer middleware configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.file); // giving no such file in this directory
    const uploadDir = './uploads/';
    // console.log('Upload directory path:', uploadDir);
    // Check if the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      // If not, create it
      fs.mkdirSync(uploadDir);
     
    }
    cb(null, uploadDir); // Directory where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    const sanitizedDate = new Date().toISOString().replace(/:/g, '_'); // Replace colons with underscores
    console.log (sanitizedDate)
cb(null, sanitizedDate + '-' + file.originalname); // Naming uploaded files

    // cb(null, new Date().toISOString() + '-' + file.originalname); // Naming uploaded files
  }
});
const upload = multer({ storage: storage });

console.log('upload', upload);

// Routes
router.post('/event_create', upload.single('image'), (req, res, next) => {
  // Log file upload information
  if (req.file) {
    console.log('File uploaded successfully:', req.file.filename);
  } else {
    console.log('No file uploaded');
  }
  next(); // Call the next middleware or route handler
}, eventController.createEvent);

router.get('/event_all', eventController.getAllEvents);

module.exports = router;
