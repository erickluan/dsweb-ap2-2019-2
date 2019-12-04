var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');

var logger = require('morgan');
var passport = require('passport');

module.exports = function() {
	var app = express();
	app.use(bodyParser.json());
	
	// configurações
	app.use(cors());
	app.set('port', 4001);

	// middleware
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(express.static('./public'));
	app.use(logger('dev'));
	app.use(passport.initialize());

	consign({cwd: 'app'})
		.include('models')
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};
