// middleware/authMiddleware.js
require('dotenv').config();

/**
 * Strict Government API Key verification middleware.
 * Verifies that requests pushing live passport updates originate from
 * the official Ethiopian Immigration and Citizenship Service (ICS) core system.
 */
const verifyIcsApiKey = (req, res, next) => {
  const apiKey = req.headers['x-ics-api-key'];
  const validApiKey = process.env.ICS_WEBHOOK_SECRET || 'ics_gov_sec_live_9f82a17b3c4d';

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing x-ics-api-key header. Official Ethiopian ICS credentials required.'
    });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Invalid ICS Government API Key. Request rejected by PassTrack Gov-Tech Gateway.'
    });
  }

  // Key is valid; proceed to webhook handler
  next();
};

module.exports = {
  verifyIcsApiKey
};
