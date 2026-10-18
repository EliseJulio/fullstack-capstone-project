const express = require('express');
const { connectToDatabase } = require('./db');

const router = express.Router();

router.get('/api/search', async (req, res) => {
  try {
    const { category, q } = req.query;
    const db = await connectToDatabase();
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    if (q) {
      filter.name = { $regex: new RegExp(q, 'i') };
    }

    const items = await db.collection('items').find(filter).toArray();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
