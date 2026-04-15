const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Selected', 'Rejected'],
    default: 'Applied',
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
