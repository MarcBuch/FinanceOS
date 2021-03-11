const express = require('express');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./database/database');

// Init database connection
connectDB();

// Init express
const app = express();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Init passport
require('./lib/passport')(passport);

app.use(passport.initialize());

// Load the routes
app.use('/api/auth', require('./routes/authRoutes'));

// Listen on an http port
app.listen(5000);