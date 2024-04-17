const express = require('express')
const router = express.Router()
const moment = require('moment')
const AccountModel = require('../../models/AccountModel')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

// Helper function for handling responses
const handleResponse = (res, code, msg, data = null) => {
  res.json({ code, msg, data });
};

// Account list
router.get('/account', checkTokenMiddleware, async (req, res) => {
  try {
    const data = await AccountModel.find().sort({ time: -1 });
    handleResponse(res, '0000', '读取成功', data);
  } catch (err) {
    console.error('Failed to read accounts:', err);
    handleResponse(res, '1001', '读取失败');
  }
});

// Create record
router.post('/account', checkTokenMiddleware, async (req, res) => {
  try {
    const data = await AccountModel.create({
      ...req.body,
      time: moment(req.body.time).toDate(),
    });
    handleResponse(res, '0000', '创建成功', data);
  } catch (err) {
    console.error('Failed to create record:', err);
    handleResponse(res, '1002', '创建失败');
  }
});

// Delete record
router.delete('/account/:id', checkTokenMiddleware, async (req, res) => {
  try {
    await AccountModel.deleteOne({ _id: req.params.id });
    handleResponse(res, '0000', '删除账单成功');
  } catch (err) {
    console.error('Failed to delete account:', err);
    handleResponse(res, '1003', '删除账单失败');
  }
});

// Get single account information
router.get('/account/:id', checkTokenMiddleware, async (req, res) => {
  try {
    const data = await AccountModel.findOne({ _id: req.params.id });
    handleResponse(res, '0000', '读取账单成功', data);
  } catch (err) {
    console.error('Failed to retrieve account:', err);
    handleResponse(res, '1004', '读取账单失败');
  }
});

// Update single account information
router.patch('/account/:id', checkTokenMiddleware, async (req, res) => {
  try {
    const data = await AccountModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    handleResponse(res, '0000', '更新账单成功', data);
  } catch (err) {
    console.error('Failed to update account:', err);
    handleResponse(res, '1005', '更新账单失败');
  }
});

module.exports = router;
