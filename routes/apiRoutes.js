//Dependencies
var express = require('express');
var router = express.Router();
var connection = require('../config/connection.js');
var orm = require('../config/orm.js')

//post route to create new burgers
router.post("/api/burgers", function (req, res) {
    console.log(req.body);
    //Use orm create method
    orm.create("burgers", req.body, function (response) {
        console.log("response from ORM", response);
        //If a row gets created send 200 else 500.
        if (response.affectedRows === 1) {
            return res.status(200).end();
        }
        return res.status(500).end();
    });
});

//put route for updating the devoured boolean
router.put("/api/burgers/:id", function (req, res) {
    //Grab the sent id and create a new variable with for mySQL syntax
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    //use orm update method to change the boolean value devoured to true.
    orm.update("burgers", { devoured: true }, condition, function (response) {
        console.log(response);
        //If the row gets changed send 200 otherwise 500
        if (response.affectedRows === 1) {
            return res.status(200).end();
        }
        return res.status(500).end();

    })
})
//delete route for deleting a burger that have been devoured
router.delete("/api/burgers/:id", function (req, res) {
    console.log(req.body);
    //Get the id and store in variable with mySQL syntax.
    var condition = "id = " + req.params.id;
    //use orm delete method to delete the row in DB
    orm.delete("burgers", condition, function (response) {
        console.log("response from ORM", response);
        //If the row is deleted send 200 otherwise 500
        if (response.affectedRows === 1) {
            return res.status(200).end();
        }
        return res.status(500).end();
    })
})

module.exports = router;