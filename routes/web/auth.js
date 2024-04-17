const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

// 注册页面
router.get('/reg', (req, res) => {
  res.render('auth/reg');
});

// 处理注册请求
router.post('/reg', (req, res) => {
  const hashedPassword = md5(req.body.password);
  UserModel.create({ ...req.body, password: hashedPassword })
    .then(() => {
      res.render('success', { msg: 'Registration successful', url: '/login' });
    })
    .catch((error) => {
      console.error('Registration failed:', error);
      res.status(500).send('Registration failed');
    });
});

// 登录页面
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// 处理登录请求
router.post('/login', (req, res) => {
  const hashedPassword = md5(req.body.password);
  UserModel.findOne({ username: req.body.username, password: hashedPassword })
    .then((user) => {
      if (user) {
        req.session.username = user.username;
        req.session._id = user._id;
        res.render('success', { msg: 'Login successful', url: '/account' });
      } else {
        res.send('Incorrect username or password');
      }
    })
    .catch((error) => {
      console.error('Login failed:', error);
      res.status(500).send('Login failed');
    });
});

// 处理登出请求
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: 'Logged out successfully', url: '/login' });
  });
});

module.exports = router;