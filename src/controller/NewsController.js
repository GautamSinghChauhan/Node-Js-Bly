const News = require('../models/News');

const createNews = async (req, res) => {
  try {
    const { title, content, image, author } = req.body;

    // Get the current date
    const currentDate = new Date();

    // Create a new news object with the current date
    const news = new News({ title, content, image, author, date: currentDate });

    // Save the news article to the database
    const savedNews = await news.save();

    // Respond with the saved news article
    res.status(201).json(savedNews);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: 'Failed to create news article' });
  }
};
const updateNews = async (req, res) => {
  try {
    // Extract the news ID from the request parameters
    const { id } = req.params;

    // Find the news article by ID
    let news = await News.findById(id);

    console.log(news);

    // If the news article doesn't exist, return a 404 error
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    // Update the news article with the new data from the request body
    news.title = req.body.title || news.title;
    news.content = req.body.content || news.content;
    news.image = req.body.image || news.image;
    news.author = req.body.author || news.author;

    // Save the updated news article
    news = await news.save();

    // Respond with the updated news article
    res.status(200).json(news);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: 'Failed to update news article' });
  }
};

const deleteNews = async (req, res) => {
  try {
    // Extract the news ID from the request parameters
    const { id } = req.params;

    const deleteNews = await News.findByIdAndDelete(id);
    if(!deleteNews){
      return res.status(404).json({ error: 'News article not found' });
    }else{
      return res.status(200).json({ message: 'News article deleted successfully' });

    }
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: 'Failed to delete news article' });
  }
}

module.exports = { createNews ,updateNews,deleteNews };
