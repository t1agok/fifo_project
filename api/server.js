// server setup
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./models');
const errorHandler = require('./middleware/errorHandler'); // Import the error handler middleware

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const materialRoutes = require('./routes/materialRoute');
const userRoutes = require('./routes/usersRoute');
const operationRoutes = require('./routes/operationRoute');
const stockRoutes = require('./routes/stockRoute');

//endpoints
app.use('/api/materials', materialRoutes);
app.use('/api/users', userRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/stock', stockRoutes);
app.use(express.json());

app.use(errorHandler);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      error: 'Something went wrong!',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    });
});

//listening to server connection
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database conection failed: ', err.message)  
  });