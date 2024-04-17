const express = require('express');
const router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

// Middleware to check session
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

// Redirect root to /account
router.get('/', async (req, res) => {
  res.redirect('/account');
});

// List all accounts
router.get('/account', checkLoginMiddleware, async (req, res) => {
  try {
    const accounts = await AccountModel.find().sort({ time: -1 });
    res.render('list', { accounts, moment });
  } catch (err) {
    console.error('Failed to retrieve accounts:', err);
    res.status(500).send('Reading failed');
  }
});

// Add record form
router.get('/account/create', checkLoginMiddleware, async (req, res) => {
  res.render('create');
});

// Create a record
router.post('/account', checkLoginMiddleware, async (req, res) => {
  try {
    await AccountModel.create({
      ...req.body,
      time: moment(req.body.time).toDate(),
    });
    res.render('success', { msg: 'Add successful~~~', url: '/account' });
  } catch (err) {
    console.error('Failed to insert record:', err);
    res.status(500).send('Insertion failed');
  }
});

// Delete a record
router.get('/account/:id', checkLoginMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await AccountModel.deleteOne({ _id: id });
    res.render('success', { msg: 'Delete successful~~~', url: '/account' });
  } catch (err) {
    console.error('Failed to delete account:', err);
    res.status(500).send('Deletion failed');
  }
});

module.exports = router;
