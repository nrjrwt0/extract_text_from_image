const Tesseract = require('tesseract.js');
const Image = require('../models/imageSchema');

const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    // Convert file to base64
    const base64Image = file.buffer.toString('base64');

    // Extract text from image using Tesseract.js
    const data = await Tesseract.recognize(
      `data:image/png;base64,${base64Image}`,
      'eng'
    );

    // Save to database
    const image = new Image({
      image: base64Image,
      text: data.data.text,
    });

    await image.save();

    res.status(200).json({
      message: 'Image uploaded and processed successfully',
      data: { text: data.data.text },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing image', error });
  }
};

const getAllOcrs = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    try {
      const ocrs = await Image.find()
        .skip((page - 1) * limit)
        .limit(Number(limit));

      const count = await Image.countDocuments();
      res.status(200).json({
        ocrs,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
      });
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch OCR data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error });
  }
};
module.exports = { uploadImage, getAllOcrs };
