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
	console.log(req.param("products"));
    let CustomerID = req.session.CustomerID;
    let AddressID = req.session.AddressID;
	var products = req.param("products");
    let invoice = new Date().getTime();
    let date = (new Date()).toISOString().substring(0, 19).replace('T', ' ');
    let values = [];
    for(var i=0;i<products.length;i++){
        let entry = []
        entry.push(CustomerID);
        entry.push(products[i]['ProductID']);
        entry.push(products[i]['quantity']);
        entry.push(AddressID);
        entry.push(invoice);
        entry.push(date);
        values.push(entry);
    }
    console.log(values);
	mysql.handle_database(function(connection) {
        connection.query("INSERT INTO `order` (`CustomerId`,`ProductId`, `ProductsCount`, `AddressId`, `InvoiceNumber`, `PurchaseDate`) VALUES ?", [values], function(err, rows) {
            connection.release();
            console.log(rows);
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

exports.myOrders = function(req,res){
    let CustomerID = req.session.CustomerID;
    //let CustomerID = req.body.customer;
    mysql.handle_database(function(connection) {
        connection.query("select o.PurchaseDate,o.InvoiceNumber,o.ProductsCount,o.ProductID,p.ProductName,c.Category,p.ProductPrice from `order` o inner join product p on p.ProductID = o.ProductID inner join productcategory c on o.ProductID = c.ProductID where o.CustomerID =?", [CustomerID], function(err, rows) {
            connection.release();
            if (!err) {
                let response= [];
                let covered = {};
                for(var i=0;i<rows.length;i++){
                    let temp_invoice = rows[i].InvoiceNumber;
                    let total = 0;
                    if(covered[temp_invoice]!=1){
                    covered[temp_invoice]=1;
                    let invoice = []
                    let products = [];
                    products.push({"ProductID":rows[i].ProductID,"ProductName":rows[i].ProductName,"ProductPrice":rows[i].ProductPrice,
                        "quantity":rows[i].ProductsCount,"PurchaseDate":rows[i].PurchaseDate,"Category":rows[i].Category});
                    total += (rows[i].ProductPrice)*rows[i].ProductsCount;
                    for (var j=i+1;j<rows.length;j++){
                        if(rows[j].InvoiceNumber == temp_invoice){
                        	products.push({"ProductID":rows[j].ProductID,"ProductName":rows[j].ProductName,"ProductPrice":rows[j].ProductPrice,
                                "quantity":rows[j].ProductsCount,"PurchaseDate":rows[j].PurchaseDate,"Category":rows[j].Category});
                            total += (rows[j].ProductPrice)*rows[j].ProductsCount;
                        }
                    }
                    invoice.push({"invoice":temp_invoice,"TotalPrice":total});
                    invoice.push({"products":products});
                    response.push(invoice);
                    }
                }
            console.log(response);
            res.send(response);
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

}

exports.logout = function(req,res){
	if(req.session.email){
		req.session.destroy();
		res.send({"status":200});
	}
};