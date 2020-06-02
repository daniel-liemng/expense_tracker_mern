const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const path = require('path');

const transactionsRoute = require('./routes/transactionsRoute');

const connectDB = require('./database/db');

// show dotenv the path of config file
dotenv.config({ path: './config/config.env' });

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// use body-parser
app.use(express.json());

// use Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/v1/transactions', transactionsRoute);

// for deploy
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// port
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode and on ${PORT}`.yellow.bold
  )
);
