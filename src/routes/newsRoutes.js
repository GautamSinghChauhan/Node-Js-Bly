// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const NewsController = require('../controller/NewsController');

router.post('/news', NewsController.createNews);
router.put('/news/:id', NewsController.updateNews);
router.delete('/news/:id', NewsController.deleteNews);
router.get('/getallnews', NewsController.getallnews);
router.get('/news/:id', NewsController.getNewsById);


module.exports = router;
