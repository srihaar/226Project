var mysql = require('../public/js/libraries/mysql');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.checkLogin = function(req,res){
	 mysql.handle_database(function(connection) {
	        var email = req.param("email");
	        var password = req.param("password");

	        connection.query("SELECT * FROM `customer` WHERE `Email` = ? AND `password` = ?", [email, password], function(err, rows) {
	            connection.release();
	            if (!err) {
	                if (rows.length > 0) {
	                    console.log("Found username and password");
	                    		req.session.email = email;
	                    		req.session.CustomerID = rows[0].CustomerID;
	                    		req.session.AddressID = rows[0].AddressID;
	                            res.send({
	                                "statusCode": 200,
	                            });
	                } else {
	                    res.send({
	                        "statusCode": 404
	                    });
	                }
	            } else {
	                res.send({
	                    "statusCode": 100,
	                    "status": "Error in connection database"
	                });
	                console.log("error: " + err);
	            }
	        });

	        connection.on('error', function(err) {
	            console.log("error: " + err);
	            res.send({
	                "statusCode": 100,
	                "status": "Error in connection database"
	            });
	        });
	    });
};

exports.getAllProducts = function(req,res){
	console.log(req.session.email);
	mysql.handle_database(function(connection) {
		var query = "select p.ProductID, p.ProductName,p.ProductPrice, c.Category, s.VendorID, v.Name from product p inner join productcategory c on p.ProductID = c.ProductID inner join soldby s on s.ProductID = p.ProductID inner join vendor v on v.VendorID = s.VendorID";
		
        connection.query(query, [], function(err, rows) {
            connection.release();
            if (!err) {
                if (rows.length > 0) {
                    console.log("Got all products");
                            res.send(rows);
                } else {
                    res.send({
                        "statusCode": 404
                    });
                }
            } else {
                res.send({
                    "statusCode": 100,
                    "status": "Error in connection database"
                });
                console.log("error: " + err);
            }
        });

        connection.on('error', function(err) {
            console.log("error: " + err);
            res.send({
                "statusCode": 100,
                "status": "Error in connection database"
            });
        });
    });
};

exports.getProfile = function(req,res){
	console.log(req.session.email);
	mysql.handle_database(function(connection) {
		
        connection.query("select * from customer c inner join address a on c.AddressID = a.AddressID and CustomerID = ?", [req.session.CustomerID], function(err, rows) {
            connection.release();
            if (!err) {
                if (rows.length > 0) {
                    console.log("Got profile");
                            res.send({"statusCode":200,"profile":rows[0]});
                } else {
                    res.send({
                        "statusCode": 404
                    });
                }
            } else {
                res.send({
                    "statusCode": 100,
                    "status": "Error in connection database"
                });
                console.log("error: " + err);
            }
        });

        connection.on('error', function(err) {
            console.log("error: " + err);
            res.send({
                "statusCode": 100,
                "status": "Error in connection database"
            });
        });
    });
};

exports.saveProfile = function(req,res){
	console.log(req.session.CustomerID);
	console.log(req.session.AddressID);
	console.log(req.param("user"));
	var user = req.param("user");
	mysql.handle_database(function(connection) {
		
        connection.query("update address set Zipcode=?,Aptnumber=?,Street=?,City=?,State=? where AddressID = ?;" +
        		"update customer set Firstname=?,Lastname=?,Phonenumber =?,Email=?,password=? where CustomerID =?", [user.Zipcode,user.Aptnumber,user.Street,user.City,user.State,user.AddressID,user.Firstname,user.Lastname,user.Phonenumber,user.Email,user.password,user.CustomerID], function(err, rows) {
            connection.release();
            if (!err) {
                if (rows.length > 0) {
                    console.log("Update profile");
                            res.send({"statusCode":200});
                } else {
                    res.send({
                        "statusCode": 404
                    });
                }
            } else {
                res.send({
                    "statusCode": 100,
                    "status": "Error in connection database"
                });
                console.log("error: " + err);
            }
        });

        connection.on('error', function(err) {
            console.log("error: " + err);
            res.send({
                "statusCode": 100,
                "status": "Error in connection database"
            });
        });
    });
};


exports.placeOrder = function(req,res){
	console.log(req.session.email);
	console.log(req.session.CustomerID);
	console.log(req.session.AddressID);
	console.log(req.param("products"));
	var products = req.param("products");
	mysql.handle_database(function(connection) {
		
        connection.query("", [], function(err, rows) {
            connection.release();
            if (!err) {
                if (rows.length > 0) {
                    console.log("Placed order");
                            res.send({"statusCode":200});
                } else {
                    res.send({
                        "statusCode": 404
                    });
                }
            } else {
                res.send({
                    "statusCode": 100,
                    "status": "Error in connection database"
                });
                console.log("error: " + err);
            }
        });

        connection.on('error', function(err) {
            console.log("error: " + err);
            res.send({
                "statusCode": 100,
                "status": "Error in connection database"
            });
        });
    });
};

exports.logout = function(req,res){
	if(req.session.email){
		req.session.destroy();
		res.send({"status":200});
	}
};