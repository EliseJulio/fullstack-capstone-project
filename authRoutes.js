const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('./db');

const router = express.Router();
const secretKey = process.env.JWT_SECRET || 'capstone-secret';

router.post('/api/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { name, email, password } = req.body;

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: result.insertedId, email }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ success: true, token, user: { id: result.insertedId, name, email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/api/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
