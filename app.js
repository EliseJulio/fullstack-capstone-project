const express = require('express');
const cors = require('cors');
const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');
const authRoutes = require('./authRoutes');
const { connectToDatabase } = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Gift Marketplace API',
    routes: ['/api/gifts', '/api/gifts/:id', '/api/search', '/api/register', '/api/login']
  });
});

app.use(giftRoutes);
app.use(searchRoutes);
app.use(authRoutes);

app.get('/api/search', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { category } = req.query;
    const filter = category ? { category: { $regex: new RegExp(category, 'i') } } : {};
    const results = await db.collection('items').find(filter).toArray();
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
