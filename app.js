const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const notFound = require('./middleware/notFoundMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/api/students', studentRoutes);

// Not found middleware (must be after routes)
app.use(notFound);

// Error handler middleware (must be last)
app.use(errorHandler);

module.exports = app;
