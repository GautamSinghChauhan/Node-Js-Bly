const Event = require('../models/events');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, postedBy, type } = req.body;
    // const image = req.file.path; // Assuming Multer middleware is used for file upload
    const image = req.file.filename; // Get the file name of the uploaded image

    // console.log('Request body:', req.body);

    //  console.log('Image path:', image);

    const event = new Event({
      title,
      description,
      image,
      date,
      postedBy,
      type
    });

    

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get events' });
  }
};
