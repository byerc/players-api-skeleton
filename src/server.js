const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const { jwt } = require('./auth/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jwt);
app.use('/', routes);
// Handle errors
app.use((err, req, res, next) => {
  // Express JWT defaults to send 401 - send 403 instead
  if (err.name === 'UnauthorizedError') {
    res.status(403).send();
  }
  // Fallback to internal server error
  res.status(err.status || 500).send();
});

module.exports = app;
