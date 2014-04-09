// Module dependencies
var koa = require('koa');
var serve = require('koa-static');
var route = require('koa-route');
var logger = require('koa-logger');

// local dependencies
var motiveHandler = require("./routes/motive.js");

// Module exports
var app = module.exports = koa();

// Middleware
app.use(logger());
app.use(serve(__dirname + '/public'));

// routes
app.use(route.post('/motive/new', motiveHandler.addMotive));
app.use(route.get('/motive/:name', motiveHandler.getMotive));

// fire it up
app.listen(3456);
console.log('foto-foto is running - http://localhost:3456');