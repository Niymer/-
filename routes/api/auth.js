const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/config');

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username, 
      password: md5(req.body.password)
    });

    if (user) {
      const token = jwt.sign({
        username: user.username,
        _id: user._id,
      }, secret, { expiresIn: '7d' });

      res.json({
        code: '0000',
        msg: 'Login successful',
        data: token
      });
    } else {
      res.json({
        code: '2002',
        msg: 'Incorrect username or password',
        data: null
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.json({
      code: '2001',
      msg: 'Database read failed',
      data: null
    });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: 'Logged out successfully', url: '/login' });
  });
});

module.exports = router;
