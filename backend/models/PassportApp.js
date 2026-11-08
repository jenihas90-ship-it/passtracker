const mongoose = require('mongoose');

const passportApplicationSchema = new mongoose.Schema({
  applicationNumber: { type: String, required: true, unique: true },
  applicantName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  currentStatus: { 
    type: String, 
    enum: [
      'Submitted', 'Biometrics Pending', 'Processing', 
      'Printed', 'Ready for Pickup', 'Discrepancy Flagged'
    ], 
    default: 'Submitted' 
  },
  statusHistory: [{
    status: String,
    updatedAt: { type: Date, default: Date.now }
  }],
  officeLocation: { type: String }, // e.g., 'Addis Ababa Main', 'Jimma'
  discrepancyNotes: { type: String, default: null } 
});

passportApplicationSchema.index({ applicantName: 'text' });

module.exports = mongoose.model('PassportApp', passportApplicationSchema);
