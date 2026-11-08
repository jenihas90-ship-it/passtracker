const mongoose = require('mongoose');
const PassportApp = require('./models/PassportApp');
const initialApplications = require('./data/seedData');

let isMongoConnected = false;

// Fallback in-memory store if MongoDB is not running locally
let memoryStore = JSON.parse(JSON.stringify(initialApplications));

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/passtrack';
  try {
    mongoose.set('strictQuery', false);
    // Attempt short-timeout connection
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log(`[Database] Successfully connected to MongoDB at ${mongoUri}`);

    // Seed if empty
    const count = await PassportApp.countDocuments();
    if (count === 0) {
      await PassportApp.insertMany(initialApplications);
      console.log(`[Database] Seeded ${initialApplications.length} mock Ethiopian ICS passport applications to MongoDB.`);
    }
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[Database] MongoDB not reachable (${error.message}).`);
    console.log(`[Database] Seamlessly running in High-Performance Local In-Memory Mode with pre-seeded ICS data.`);
  }
};

// Unified Data Access Layer (DAL)
const dal = {
  isMongo: () => isMongoConnected,

  async findOne(query) {
    if (isMongoConnected) {
      return await PassportApp.findOne(query).lean();
    }
    return memoryStore.find(app => {
      let match = true;
      if (query.applicationNumber && app.applicationNumber.toLowerCase() !== query.applicationNumber.toLowerCase()) {
        match = false;
      }
      return match;
    }) || null;
  },

  async find(query = {}) {
    if (isMongoConnected) {
      return await PassportApp.find(query).sort({ 'statusHistory.updatedAt': -1 }).lean();
    }
    return [...memoryStore];
  },

  async updateStatus(applicationNumber, newStatus, note = null) {
    const timestamp = new Date();
    if (isMongoConnected) {
      const doc = await PassportApp.findOne({ applicationNumber });
      if (!doc) return null;
      doc.currentStatus = newStatus;
      doc.statusHistory.push({ status: newStatus, updatedAt: timestamp });
      if (note) doc.discrepancyNotes = note;
      await doc.save();
      return doc.toObject();
    }

    const app = memoryStore.find(a => a.applicationNumber.toLowerCase() === applicationNumber.toLowerCase());
    if (!app) return null;
    app.currentStatus = newStatus;
    app.statusHistory.push({ status: newStatus, updatedAt: timestamp });
    if (note) app.discrepancyNotes = note;
    return app;
  },

  async reportDiscrepancy(applicationNumber, discrepancyNotes) {
    const timestamp = new Date();
    if (isMongoConnected) {
      const doc = await PassportApp.findOne({ applicationNumber });
      if (!doc) return null;
      doc.currentStatus = 'Discrepancy Flagged';
      doc.discrepancyNotes = discrepancyNotes;
      doc.statusHistory.push({ status: 'Discrepancy Flagged', updatedAt: timestamp });
      await doc.save();
      return doc.toObject();
    }

    const app = memoryStore.find(a => a.applicationNumber.toLowerCase() === applicationNumber.toLowerCase());
    if (!app) return null;
    app.currentStatus = 'Discrepancy Flagged';
    app.discrepancyNotes = discrepancyNotes;
    app.statusHistory.push({ status: 'Discrepancy Flagged', updatedAt: timestamp });
    return app;
  },

  async resetSeed() {
    if (isMongoConnected) {
      await PassportApp.deleteMany({});
      await PassportApp.insertMany(initialApplications);
    }
    memoryStore = JSON.parse(JSON.stringify(initialApplications));
    return { success: true, count: initialApplications.length };
  }
};

module.exports = {
  connectDB,
  dal
};
