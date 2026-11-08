// routes/webhook.js
const express = require('express');
const router = express.Router();
const PassportApp = require('../models/PassportApp');
const { verifyIcsApiKey } = require('../middleware/authMiddleware');
const { dal } = require('../db');

/**
 * Placeholder / Trigger function for Make.com Webhook & Telegram Alerts.
 * Automatically called when official ICS core server marks a passport as "Completed".
 */
const triggerMakeTelegramWebhook = async (application, officerId) => {
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

  console.log(`\n================== [MAKE.COM / TELEGRAM ALERT] ==================`);
  console.log(`[ICS Gov Webhook] Passport COMPLETED for: ${application.applicantName}`);
  console.log(`[ICS Gov Webhook] Application Ref: ${application.applicationNumber}`);
  console.log(`[ICS Gov Webhook] Notifying Citizen at: ${application.phoneNumber}`);
  console.log(`[ICS Gov Webhook] Pickup Office: ${application.officeLocation}`);
  console.log(`[ICS Gov Webhook] Authorized By Officer: ${officerId}`);
  console.log(`=================================================================\n`);

  // Active webhook delivery to Make.com / Telegram API if configured
  if (makeWebhookUrl && makeWebhookUrl.startsWith('http')) {
    try {
      await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'PASSPORT_COMPLETED',
          applicationNumber: application.applicationNumber,
          applicantName: application.applicantName,
          phoneNumber: application.phoneNumber,
          pickupLocation: application.officeLocation,
          officerId,
          timestamp: new Date().toISOString()
        })
      });
      console.log(`[ICS Gov Webhook] Make.com webhook successfully notified.`);
    } catch (err) {
      console.warn(`[ICS Gov Webhook] Make.com dispatch error: ${err.message}`);
    }
  }
};

/**
 * POST /api/webhook/ics-status-update
 * Secure receiver endpoint for real-time status updates from the official Ethiopian ICS core system.
 */
router.post('/ics-status-update', verifyIcsApiKey, async (req, res) => {
  try {
    const { applicationNumber, newStatus, officerId } = req.body;

    // 1. Validate payload
    if (!applicationNumber || !newStatus || !officerId) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payload: applicationNumber, newStatus, and officerId are all strictly required.'
      });
    }

    let application = null;
    const timestamp = new Date();

    // 2. Mongoose database query & update
    if (PassportApp.db && PassportApp.db.readyState === 1) {
      application = await PassportApp.findOne({ applicationNumber: applicationNumber.trim() });

      if (!application) {
        return res.status(404).json({
          success: false,
          error: `Passport application with reference ${applicationNumber} not found in PassTrack database.`
        });
      }

      // Update current status
      application.currentStatus = newStatus;

      // Push event into statusHistory array
      application.statusHistory.push({
        status: newStatus,
        updatedAt: timestamp
      });

      await application.save();
    } else {
      // Local development/in-memory mode for offline hackathon demonstration
      application = await dal.findOne({ applicationNumber: applicationNumber.trim() });

      if (!application) {
        return res.status(404).json({
          success: false,
          error: `Passport application with reference ${applicationNumber} not found in PassTrack database.`
        });
      }

      application = await dal.updateStatus(applicationNumber.trim(), newStatus);
    }

    // 3. Trigger Make.com & Telegram alert if new status is "Completed"
    let telegramAlertDispatched = false;
    if (newStatus.toLowerCase() === 'completed' || newStatus.toLowerCase() === 'ready for pickup') {
      await triggerMakeTelegramWebhook(application, officerId);
      telegramAlertDispatched = true;
    }

    // 4. Return secure acknowledgment response to ICS core server
    return res.status(200).json({
      success: true,
      message: `Passport application ${applicationNumber} successfully updated to "${newStatus}".`,
      data: {
        applicationNumber: application.applicationNumber,
        applicantName: application.applicantName,
        currentStatus: application.currentStatus,
        lastUpdated: timestamp,
        officerId,
        telegramAlertDispatched
      }
    });

  } catch (error) {
    console.error('ICS Webhook Processing Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing government status webhook.'
    });
  }
});

module.exports = router;
