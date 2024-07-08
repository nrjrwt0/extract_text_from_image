const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect(
    'mongodb+srv://dev:1yU5fXf5EUdStLNT@clustor.q1xofmp.mongodb.net/?retryWrites=true&w=majority&appName=clustor'
  );
};

module.exports = connect;
