const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    text: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Image', ImageSchema);
