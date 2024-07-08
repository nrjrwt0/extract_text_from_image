const express = require('express');
const cors = require('cors');
const connect = require('./config/db');
const { auth } = require('./middleware/auth');
const cookies = require('cookie-parser');

const app = express();

const PORT = 8000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(cookies());

const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/user', authRoutes);
app.use('/image', auth, imageRoutes);

async function start() {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  } catch (err) {
    console.log(`Something went wrong!!!`, err);
  }
}
start();
