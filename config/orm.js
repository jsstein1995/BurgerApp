var connection = require('./connection.js');

// ORM (SQL middleman)
var orm = {
    //Function to create a new row in mySQL
    create: function (table, newRow, cb) {
        console.log("Create")
        connection.query("INSERT INTO ?? SET ?", [table, newRow], function (err, results) {
            if (err) {
                console.log(err);
                return false
            }
            return cb(results);
        })
    },
    //Function to retrieve all information from burgers table
    getAll: function (columns, table, cb) {
        console.log('Get All')
        //Tables and columns ??
        //Values ?
        connection.query("SELECT ?? FROM ??", [columns, table], function (err, results) {
            if (err) {
                console.log(err)
                return false
            }
            return cb(results);
        })
    },
    //Function to update the devoured column in the table
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals)
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    //Function to delete a row
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};


// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Export the orm model to use in our routes
module.exports = orm;