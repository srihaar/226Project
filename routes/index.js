
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req,res){
	res.render('userLogin');
}

exports.home = function(req,res){
	if(req.session.email){
		res.render('home');
	}else{
		res.render('userLogin');
	}
}

exports.userHome = function(req,res){
	if(req.session.email){
		res.render('userHome');
	}else{
		res.render('userLogin');
	}
}

exports.cart = function(req,res){
	if(req.session.email){
		res.render('cart');
	}else{
		res.render('userLogin');
	}
}

exports.checkout = function(req,res){
	if(req.session.email){
		res.render('checkout');
	}else{
		res.render('userLogin');
	}
}

exports.profile = function(req,res){
	if(req.session.email){
		res.render('profile');
	}else{
		res.render('userLogin');
	}
}

