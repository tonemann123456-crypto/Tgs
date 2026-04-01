const cors = require('cors');

const corsOptions = {
  origin: 'http://example.com', // Replace with your allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);