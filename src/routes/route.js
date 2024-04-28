const express = require('express');
const router = express.Router();
const UserRoute = require('./userRoutes');
const newsRoute = require('./newsRoutes');
const EventRoute = require('./eventRoutes');

router.use(UserRoute);
router.use(newsRoute);
router.use(EventRoute);

module.exports = router;
