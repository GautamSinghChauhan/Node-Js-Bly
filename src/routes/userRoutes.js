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

router.post('/logout', verifyToken, (req, res) => {
    // console.log(req.userData);
    if (!req.token) {
        return res.status(200).json({ message: 'You are already logged out' });
      }
  // Clear the token cookie
  res.clearCookie('token');
  // Respond with a logout message
  res.status(200).json({ message: 'Logout successful' });
});



module.exports = router;
