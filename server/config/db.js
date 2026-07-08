const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const env = require('./env');

const seedAdmin = async () => {
  const existing = await Admin.findOne({ email: env.ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists, skipping seed');
    return;
  }

  await Admin.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  });

  console.log('Default admin seeded');
};

const connectDB = async () => {
  const conn = await mongoose.connect(env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);

  if (env.NODE_ENV === 'development') {
    await seedAdmin();
  }
};

module.exports = connectDB;
