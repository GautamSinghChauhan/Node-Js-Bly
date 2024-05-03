const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    const savedUser = await newUser.save();

    // return res.status(201).json(savedUser);
    return res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     // Password is correct, login successful
//     return res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to login' });
//   }
// };

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id,userName : user.email}, 'your-secret-key', { expiresIn: '1h' });

    // Set JWT in cookie
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

    // Send JWT to client
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login' });
  }
};



const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOneAndUpdate({ email }, { username }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user' });
  }
};

const getallUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get users' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getallUser
};
