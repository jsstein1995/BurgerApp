
// Require the Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var htmlRoutes = require('./routes/htmlRoutes.js');
var apiRoutes = require('./routes/apiRoutes.js');
// Create the HTTP server with express
var app = express();

//Create the PORT variable
//Include process.env.PORT when we host the project
var PORT = process.env.PORT || 8080;


//App engine handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//Allow static files to be available anywhere
app.use(express.static('public'));

//Add Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//COnnection routes
app.use(htmlRoutes);
app.use(apiRoutes);

//Server creation
app.listen(PORT, function () {
    console.log("listening on PORT: ", PORT);
})