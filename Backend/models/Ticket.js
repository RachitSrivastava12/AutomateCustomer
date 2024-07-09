const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  issue: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'open',
    enum: ['open', 'closed']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
