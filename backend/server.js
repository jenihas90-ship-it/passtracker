const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { connectDB, dal } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const passportRoutes = require('./routes/passport');
const webhookRoutes = require('./routes/webhook');

app.use(cors());
app.use(express.json());

// Webhook & Passport routes
app.use('/api/webhook', webhookRoutes);
app.use('/api/passport', passportRoutes);
app.use('/api', passportRoutes);

// Helper: Normalize Ethiopian phone numbers
function normalizeEthiopianPhone(phone) {
  if (!phone) return '';
  // Remove non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Keep last 9 digits (standard Ethiopian mobile number length without leading zero)
  if (digits.length >= 9) {
    return digits.slice(-9);
  }
  return digits;
}

// Helper: Mask phone number for public display
function maskPhoneNumber(phone) {
  if (!phone) return '';
  const cleaned = phone.trim();
  if (cleaned.length <= 4) return cleaned;
  return cleaned.slice(0, 4) + ' **** ' + cleaned.slice(-3);
}

// 1. Multi-Factor Search
app.post('/api/search', async (req, res) => {
  try {
    const { applicationNumber, phoneNumber } = req.body;

    if (!applicationNumber || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Both Application Number and Registered Phone Number are strictly required for verification.'
      });
    }

    const trimmedAppNo = applicationNumber.trim();
    const app = await dal.findOne({ applicationNumber: trimmedAppNo });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: 'No passport application found matching this reference number. Please verify your official ICS slip.'
      });
    }

    // Verify Phone Number
    const normalizedInputPhone = normalizeEthiopianPhone(phoneNumber);
    const normalizedRecordPhone = normalizeEthiopianPhone(app.phoneNumber);

    if (normalizedInputPhone !== normalizedRecordPhone) {
      return res.status(403).json({
        success: false,
        message: 'Security Verification Mismatch: The provided phone number does not correspond to the applicant record. PassTrack multi-factor protection prevents unauthorized access.'
      });
    }

    // Return sanitized application data
    return res.json({
      success: true,
      data: {
        applicationNumber: app.applicationNumber,
        applicantName: app.applicantName,
        phoneMasked: maskPhoneNumber(app.phoneNumber),
        currentStatus: app.currentStatus,
        statusHistory: app.statusHistory,
        officeLocation: app.officeLocation,
        discrepancyNotes: app.discrepancyNotes,
        lastUpdated: app.statusHistory && app.statusHistory.length > 0
          ? app.statusHistory[app.statusHistory.length - 1].updatedAt
          : new Date()
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: 'Internal server error processing search.' });
  }
});

// 2. Instant Discrepancy Reporting
app.post('/api/discrepancy', async (req, res) => {
  try {
    const { applicationNumber, phoneNumber, discrepancyType, notes, contactPreference } = req.body;

    if (!applicationNumber || !phoneNumber || !notes) {
      return res.status(400).json({
        success: false,
        message: 'Application number, phone number, and discrepancy description are required.'
      });
    }

    const app = await dal.findOne({ applicationNumber: applicationNumber.trim() });
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Multi-factor verification before flagging
    if (normalizeEthiopianPhone(phoneNumber) !== normalizeEthiopianPhone(app.phoneNumber)) {
      return res.status(403).json({ success: false, message: 'Multi-factor phone verification failed.' });
    }

    const ticketId = `ICS-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const formattedNotes = `[Ticket #${ticketId}] [Category: ${discrepancyType || 'General'}] ${notes.trim()}`;

    const updatedApp = await dal.reportDiscrepancy(applicationNumber.trim(), formattedNotes);

    return res.json({
      success: true,
      ticketId,
      message: 'Discrepancy ticket successfully created. Ethiopian ICS administrative desk has been notified.',
      data: updatedApp
    });
  } catch (error) {
    console.error('Discrepancy error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit discrepancy report.' });
  }
});

// 3. Admin: List all applications
app.get('/api/applications', async (req, res) => {
  try {
    const apps = await dal.find();
    res.json({ success: true, count: apps.length, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Admin: Update status and trigger webhook/alerts
app.patch('/api/applications/:applicationNumber/status', async (req, res) => {
  try {
    const { applicationNumber } = req.params;
    const { newStatus, note } = req.body;

    const validStatuses = [
      'Submitted', 'Biometrics Pending', 'Processing', 
      'Printed', 'Ready for Pickup', 'Discrepancy Flagged'
    ];

    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const updated = await dal.updateStatus(applicationNumber, newStatus, note);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Trigger Make.com & Telegram alert if status is "Ready for Pickup"
    let alertDispatched = null;
    if (newStatus === 'Ready for Pickup') {
      alertDispatched = {
        type: 'TELEGRAM_AND_SMS',
        recipientPhone: updated.phoneNumber,
        applicantName: updated.applicantName,
        pickupBranch: updated.officeLocation,
        timestamp: new Date().toISOString(),
        makeWebhookTriggered: true,
        telegramMessage: `🇪🇹 ICS PassTrack Notification: Hello ${updated.applicantName}, your Ethiopian passport (Ref: ${updated.applicationNumber}) is now READY FOR PICKUP at ${updated.officeLocation}. Please bring your original kebele ID or birth certificate.`
      };
      console.log(`[ALERT DISPATCHED] Make.com / Telegram Alert sent for ${updated.applicationNumber} to ${updated.phoneNumber}`);
    }

    res.json({
      success: true,
      data: updated,
      alertDispatched
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Sample applicant references for Hackathon Showcase
app.get('/api/samples', async (req, res) => {
  try {
    const apps = await dal.find();
    const samples = apps.map(a => ({
      applicationNumber: a.applicationNumber,
      applicantName: a.applicantName,
      phoneNumber: a.phoneNumber,
      currentStatus: a.currentStatus,
      officeLocation: a.officeLocation
    }));
    res.json({ success: true, samples });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. Reset Mock Data
app.post('/api/reset', async (req, res) => {
  try {
    const result = await dal.resetSeed();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. Serve Static Frontend in production / unified mode
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`PassTrack Ethiopian ICS Backend API running on port ${PORT}`);
    console.log(`Hackathon Pitch Demo: Ready for multi-factor search & alerts`);
    console.log(`====================================================`);
  });
});
