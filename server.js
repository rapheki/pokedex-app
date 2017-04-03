// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes (Express app)
app.use('/api', require('./server/routes/api'));

// Angular app: 'src' // 'dist' (packaged/minified Angular app after 'ng build')
app.use(express.static(path.join(__dirname, 'dist')));
// Images
app.use(express.static(path.join(__dirname, 'public')));

// Catch all other routes and return the index file (Angular app)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, () => {
  console.log(`app running on localhost:${port}`)
});
