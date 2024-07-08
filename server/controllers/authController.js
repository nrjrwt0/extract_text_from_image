const bcrypt = require('bcryptjs');
const UsersData = require('../models/userSchema');

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res
      .status(422)
      .json({ error: 'Please fill all the fields properly' });
  }

  try {
    const isEmailExist = await UsersData.findOne({ email: email });
    if (isEmailExist) {
      return res
        .status(422)
        .json({ error: 'Registration failed, Email already exists' });
    }

    const newUser = new UsersData(req.body);
    await newUser.save();

    if (newUser) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(500).json({ error: 'Failed to registered' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Sorry! something went wrong' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Please fill all the fields properly' });
  }

  const user = await UsersData.findOne({ email });
  if (!user) {
    res.status(400).json({
      error:
        "The username you entered doesn't belong to an account. Please check your username and try again.",
    });
  } else {
    const isPassMatch = await bcrypt.compare(password, user.password);

    const token = await user.generateAuthToken();

    res.cookie('XSRF', token, {
      expires: new Date(Date.now() + 25892000000),
      secure: true,
    });

    if (!isPassMatch) {
      res.status(400).json({
        error:
          'Sorry, your password was incorrect. Please double-check your password.',
      });
    } else {
      user.password = null;
      res.json({ message: 'User login successsfully', data: user });
    }
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.clearCookie('XSRF');
    res.status(200).send({ message: 'Logout successful' });
  } catch (e) {
    res.status(500).send({ error: 'Logout failed' });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
