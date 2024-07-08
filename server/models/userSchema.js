const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const reqString = {
  type: String,
  required: true,
  trim: true,
};

const usersSchema = new mongoose.Schema(
  {
    fullname: reqString,
    email: { ...reqString, unique: true },
    password: reqString,
    tokens: [
      {
        token: reqString,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hashing the password
usersSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// generating auth token
usersSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, 'SECRETKEY');
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

// collection creation
const UsersData = mongoose.model('user', usersSchema);

module.exports = UsersData;
