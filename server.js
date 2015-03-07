var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var jsonApi = require("./json-rest/api.js");
var config = require('config');
var debug = require("debug")("app");

app = express();
//app.use(bodyParser.urlencoded({ extended: false }); 
//app.use(bodyParser.json());
app.use(methodOverride());      // simulate DELETE and PUT

debug('Server init OK');

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


//init routes
var routes = config.get('routes');

console.log(routes);

app.get(routes[0].url, jsonApi.findAll);
app.get(routes[1].url, jsonApi.findById)

debug("routes initialized");

server = require("http").createServer(app);
server.listen(config.get("port"));

debug("server is running");