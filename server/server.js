const express = require('express');
const bodyParser = require('body-parser')
const db = require('./connect');

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`${port} is listening...`);
})