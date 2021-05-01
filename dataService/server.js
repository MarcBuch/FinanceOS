const express = require('express');
const cors = require('cors');
const connectDB = require('./database/database');

// Init Express
const app = express();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());

connectDB();

// Routes
app.use('/api/statistics', require('./routes/statistics'));
app.use('/api/transactions', require('./routes/transactions'));

app.listen(5000);

// For testing
module.exports = app;
