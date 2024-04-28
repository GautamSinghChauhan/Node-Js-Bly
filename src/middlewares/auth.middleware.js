const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.get('Authorization').split(' ')[1];

  console.log(token);
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, 'your-secret-key');
    
    // Set req.userData with user data from the token
    req.userData = { userId: decodedToken.userId };
    
    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return 401 Unauthorized
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifyToken;
