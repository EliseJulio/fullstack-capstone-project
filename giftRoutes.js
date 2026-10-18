const express = require('express');
const { connectToDatabase } = require('./db');

const router = express.Router();

router.get('/api/gifts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('items').find({}).toArray();
    res.json({ success: true, data: gifts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/api/gifts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection('items').findOne({ _id: req.params.id });
    if (!gift) {
      return res.status(404).json({ success: false, message: 'Gift not found' });
    }
    res.json({ success: true, data: gift });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
