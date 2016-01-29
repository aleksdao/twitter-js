var express = require('express');
var swig = require('swig');
var app = express();

swig.setDefaults({ cache: false });



app.engine("html", require('swig').renderFile);
app.set("view engine", "html");
app.set(__dirname + "./views/index.html")

app.get('/', function(req, res) {
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render('index', {title: 'Hall of Fame', people: people} );
	// res.send("Hello World!");

})

app.use('/', function(req, res, next) {
	console.log(req.method, req.url, res.statusCode);
	next();
})

app.use('/special/', function(req, res) {
	console.log("you've reached the special area");
})

app.listen(process.env.PORT || 8080);