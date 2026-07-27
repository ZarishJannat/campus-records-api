require('dotenv').config();
const connectDB = require('./config/database');
const app = require('./app');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
