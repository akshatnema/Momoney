const express = require('express');
const axios = require('axios');
var https = require('https');
const cache = require('./apiCache.js');
const app = express();

app.get('/posts/:id', cache(300), async (req, res) => {
  var response = '';
  try {
    const { data } = await axios
      .get('https://jsonplaceholder.typicode.com/posts/' + req.params.id)
      .catch((err) => res.send(err));
    response = data;
  } catch (err) {
    console.error('error: ', err);
  }
  res.send(response);
});

app.get('/todos/:id', cache(300), async (req, res) => {
  var response = '';
  try {
    const { data } = await axios
      .get('https://jsonplaceholder.typicode.com/todos/' + req.params.id)
      .catch((err) => res.send(err));
    response = data;
  } catch (err) {
    console.error('error: ', err);
  }
  res.send(response);
});

app.listen(3000);