const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', require('./routes/students'));
app.use('/api/communications', require('./routes/communications'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'UG Admin Dashboard API' });
});

// Test Firebase connection
app.get('/api/test-firebase', async (req, res) => {
  try {
    const { db } = require('./config/firebase');
    const testDoc = await db.collection('test').doc('connection').set({
      message: 'Firebase connected successfully!',
      timestamp: new Date()
    });
    res.json({ 
      success: true, 
      message: 'Firebase Admin SDK connected successfully!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});