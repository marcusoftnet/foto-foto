var koa = require("koa");
var serve = require("koa-static");

// Module exports
var app = module.exports = koa();

app.use(serve(__dirname + '/public'));

// fire it up
app.listen(3456);
console.log("foto-foto is listening... on http://localhost:3456");