const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

const start = async () => {
  if (!env.MONGO_URI) {
    console.error(
      'MONGO_URI is not set.\n' +
      'Create a server/.env file and add your MongoDB Atlas connection string:\n' +
      'MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/company_db?retryWrites=true&w=majority'
    );
    process.exit(1);
  }

  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};

start();
