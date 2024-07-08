const jwt = require('jsonwebtoken');
const UsersData = require('../models/userSchema');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.XSRF;

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, 'SECRETKEY');
    const user = await UsersData.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = { auth };
