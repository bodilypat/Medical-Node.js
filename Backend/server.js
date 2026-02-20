//server.js 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/patients', require('./routes/patientsRoutes'));
app.use('/api/appointments', require('./routes/appointmentsRoutes'));
app.use('/api/doctors', require('./routes/doctorsRoutes'));
app.use('/api/billings', require('./routes/billingsRoutes'));

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

