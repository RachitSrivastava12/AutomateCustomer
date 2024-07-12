const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const { detectIntent } = require('./dialogflowClient');
const apolloServer = require('./graphqlServer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/tickets', ticketRoutes);

// Dialogflow fulfillment route
app.post('/webhook', async (req, res) => {
  const { query, sessionId } = req.body;
  const response = await detectIntent(query, sessionId);
  res.json(response);
});

// Start Apollo Server
apolloServer.start().then(res => {
  apolloServer.applyMiddleware({ app });

  // Start server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
