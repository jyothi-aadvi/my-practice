const mongoose = require('mongoose');
require('dotenv').config();  
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connection established!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });