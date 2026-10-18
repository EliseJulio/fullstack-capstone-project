const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/capstone';
let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
  }

  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }

  return client.db('capstone');
}

module.exports = { connectToDatabase };
