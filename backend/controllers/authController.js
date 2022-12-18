const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const generateAccessToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '3d',
  });
};

// Login user
const login = async (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    return res
      .status(400)
      .json({ error: 'Please fill all the required fields' });
  }

  const user = await User.findOne({ emailAddress });

  if (!user) {
    return res.status(400).json({ error: 'Incorrect email address' });
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  // generate access token
  const accessToken = generateAccessToken(user._id);

  res
    .status(200)
    .json({ _id: user._id, emailAddress: user.emailAddress, accessToken });
};

// Register user
const register = async (req, res) => {
  const { emailAddress, password, confirmPassword } = req.body;

  if (!emailAddress || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: 'Please fill all the required fields' });
  }

  const isEmailUsed = await User.findOne({ emailAddress });

  if (isEmailUsed) {
    return res.status(400).json({ error: 'Email address already used' });
  }

  if (!validator.isEmail(emailAddress)) {
    return res.status(400).json({ error: 'Email address is invalid' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password is not strong enough' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords mismatch' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // try to create
  try {
    const user = await User.create({ emailAddress, password: hashedPassword });

    // generate access token
    const accessToken = generateAccessToken(user._id);

    res
      .status(200)
      .json({ _id: user._id, emailAddress: user.emailAddress, accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
