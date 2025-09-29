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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});