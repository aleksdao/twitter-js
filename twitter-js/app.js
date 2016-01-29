var express = require('express');
var swig = require('swig');
var app = express();
var routes = require('./routes/');

app.use('/', routes);

swig.setDefaults({ cache: false });

app.use(express.static('public'));


app.engine("html", require('swig').renderFile);
app.set("view engine", "html");
app.set(__dirname + "./views/index.html")


app.listen(process.env.PORT || 8080);