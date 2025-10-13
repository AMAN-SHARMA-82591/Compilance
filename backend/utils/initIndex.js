// initIndex.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your connection string
const dbName = 'myAppDB'; // Replace with your actual database name

async function initIndexes() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('users');

    // Check existing indexes
    const existingIndexes = await users.indexes();
    const hasEmailIndex = existingIndexes.some(index => index.name === 'email_1');

    if (!hasEmailIndex) {
      await users.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Created index on email');
    } else {
      console.log('📦 Email index already exists');
    }

    // You can add other collections/indexes here
    // await db.collection('orders').createIndex(...);
  } catch (error) {
    console.error('Failed to initialize indexes:', error);
  } finally {
    await client.close();
  }
}

initIndexes();