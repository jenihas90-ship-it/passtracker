// routes/passport.js
const express = require('express');
const router = express.Router();
const PassportApp = require('../models/PassportApp'); // Adjust path to your Mongoose model

router.get('/search-by-name', async (req, res) => {
  try {
    const { firstName, middleName, lastName } = req.query;
    
    // Require at least the first and middle name to avoid pulling too many records
    if (!firstName || !middleName) {
      return res.status(400).json({ error: "First and Middle names are required." });
    }

    // Construct the full name string, handling the optional last name
    const searchString = lastName 
      ? `${firstName} ${middleName} ${lastName}`.trim()
      : `${firstName} ${middleName}`.trim();

    // Use a case-insensitive regex for flexible matching (^ ensures it starts with the string)
    const nameRegex = new RegExp(`^${searchString}`, 'i');

    let applications;
    if (PassportApp.db && PassportApp.db.readyState === 1) {
      applications = await PassportApp.find(
        { applicantName: nameRegex },
        '-_id applicationNumber applicantName currentStatus officeLocation' 
      );
    } else {
      // High-performance fallback when running in local memory mode
      const { dal } = require('../db');
      const all = await dal.find();
      applications = all
        .filter(app => nameRegex.test(app.applicantName))
        .map(app => ({
          applicationNumber: app.applicationNumber,
          applicantName: app.applicantName,
          currentStatus: app.currentStatus,
          officeLocation: app.officeLocation
        }));
    }

    if (applications.length === 0) {
      return res.status(404).json({ message: "No passport application found for this name." });
    }

    res.status(200).json(applications);

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error during search." });
  }
});

module.exports = router;
