
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

async function run() {
  try {
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL;
    if (!mongoUrl) throw new Error('MONGODB_URL not set in .env');
    await mongoose.connect(mongoUrl);

    console.log('Connected to Mongo. Seeding...');

   
    const demo = {
      title: "Demo Launch Party",
      description: "A sample demo event created by seed script.",
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 26 * 7).toISOString(),
      location: "Virtual - Zoom",
      tickets: [
        { name: "General Admission", priceCents: 5000, quantity: 100 },
        { name: "VIP", priceCents: 15000, quantity: 20 }
      ]
    };


    await Event.deleteMany({ title: demo.title });

    const created = await Event.create(demo);
    console.log('Seeded event:', created._id);
    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

run();
