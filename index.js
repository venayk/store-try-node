const express = require('express');
const mustacheExpress = require('mustache-express');
var http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { notFound } = require('./common/response');
const items = require('./routes/items');
const weather = require('./routes/weather');
const { logRequest } = require('./middleware/requestLogger');

mongoose.connect('mongodb://localhost/storeTry', {
	useNewUrlParser: true,
	autoIndex: false,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(logRequest);
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('', (req, res) => {
	res.render('index', { _this: parseInt(Math.random()*100) });
});

app.use('/items', items);

app.use('/weather', weather);

app.use(notFound);

const server = http.createServer(app).listen(3001);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
	console.error(error);
	throw error;
}

function onListening() {
	console.log('listening');
}