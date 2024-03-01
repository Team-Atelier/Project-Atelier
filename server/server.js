const express = require('express');
const path = require('path');
require('dotenv').config();

const morgan = require('morgan');

const app = express();

const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});