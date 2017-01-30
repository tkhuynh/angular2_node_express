// get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// get API routes
const api = require('./server/routes/api');

const app = express();

// parser for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// set api routes
app.use('/api', api);

// cathch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// get port from environment and store in Express

const port = process.env.PORT || '3000';
app.set('port', port);

// create HTTP server
const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));