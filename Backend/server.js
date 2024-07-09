const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);

// Connect to MongoDB (Assuming you have MongoDB URL defined in an environment variable)
mongoose.connect('mongodb+srv://rachitsrirkst:L6ZY91ErF6Cji1JP@cluster0.oa0oqlk.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));
