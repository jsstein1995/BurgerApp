//Require all the dependencies
var express = require('express');
var router = express.Router();
//var connection = require('../config/connection.js');
var orm = require('../config/orm.js')

//Home get route
router.get("/", function (req, res) {
    //orm using getAll function "*" = all 
    orm.getAll("*", "burgers", function (response) {
        console.log('ORM response: ,', response);
        res.render('index', { title: "Eat Da Burger", burger: response })
    });
})
module.exports = router;