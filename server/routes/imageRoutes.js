const express = require('express');
const multer = require('multer');
const { uploadImage, getAllOcrs } = require('../controllers/imageController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/ocrs', getAllOcrs);

module.exports = router;
