const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  queryHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }]
});

module.exports = mongoose.model('Customer', customerSchema);
