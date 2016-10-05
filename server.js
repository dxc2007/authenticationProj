var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');

var app = express();
var routes = require('./routes/routes.js');
var port = process.env.port || 8080;

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "jade");
app.locals.pretty = true;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'templates')));

app.use(sessions({
    cookieName: 'session',
    secret: 'fdshs7h68s998hsfhgsfdhg',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true, //don't let browser js access cookies ever
    secure: true,
    ephermeral: true,
}));

app.use(routes);
app.listen(port, function() {
    console.log("listening on port: " + port);
});