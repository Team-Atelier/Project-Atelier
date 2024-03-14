/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;
const apiURL = process.env.API_URL;
const token = process.env.GITHUB_TOKEN;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.all('/api/*', async (req, res) => {
  try {
    const finalUrl = `${apiURL}${req.url.replace('/api/', '')}`;
    const requestConfig = {
      method: req.method,
      url: finalUrl,
      headers: {
        Authorization: token,
      },
      data: req.body,
    };

    const response = await axios(requestConfig);

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening at Port:${port}`);
});
