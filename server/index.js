const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const applicationRoutes = require('./routes/applicationRoutes');

// 1. Configure dotenv properly
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware configuration
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// 3. API Routes
app.use('/applications', applicationRoutes);

// Root route for health check
app.get('/', (req, res) => {
  res.send('Placement Tracker API (Local MongoDB) is running...');
});

// 4. Local MongoDB Connection Logic
// Using 127.0.0.1 instead of localhost for stability
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placementDB';

console.log('Connecting to Local MongoDB...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Success: Connected to Local MongoDB');
    
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`✅ Success: Server is running on port ${PORT}`);
      console.log(`✅ API available at http://localhost:${PORT}/applications`);
    });
  })
  .catch((err) => {
    console.error('❌ Local MongoDB connection error:');
    console.error(`Error: ${err.message}`);
    console.log('\nPossible fixes:');
    console.log('1. Ensure MongoDB is installed locally.');
    console.log('2. Open PowerShell as Admin and run: net start MongoDB');
    console.log('3. Check if your .env MONGO_URI is correct.\n');
    process.exit(1);
  });
