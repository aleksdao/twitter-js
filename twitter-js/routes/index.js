module.exports = function(io) {


	var express = require('express');
	var router = express.Router();
	// could use one line instead: var router = require('express').Router();
	var tweetBank = require('../tweets');
	var bodyParser = require('body-parser');

	router.use(bodyParser.urlencoded({ extended: false }));
	router.use(bodyParser.json());


	router.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var tweets = tweetBank.find( {name: name} );
	  console.log(name);
	  res.render( 'index', { title: 'Twitter.js - Posts by '+name, user: name, tweets: tweets, showForm: true } );
	});

	router.get('/tweets/:id', function(req, res) {
		var id = Number(req.params.id);
		var tweets = tweetBank.find( {id: id} );
	  	res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: false } );

	});

	router.post('/tweets', function(req, res) {
	  
		var name = req.body.name;
  	var text = req.body.text;
	  //console.log(name, text);
  	var id = tweetBank.add(name, text);
  	//res.redirect('/');
  	io.sockets.emit('new_tweet', { name: name, text: text, id: id });
	});

	return router;
}