const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const verifyToken = require('../middlewares/auth.middleware'); // Import the verifyToken middleware

// User registration route
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
// router.post('/updateuser', UserController.updateUser);
router.put('/updateUser', verifyToken, UserController.updateUser); // Add token verification to the updateUser route

router.get('/getalluser', UserController.getallUser);

module.exports = router;
