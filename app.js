
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var session = require('client-sessions');

var app = express();

// all environments
//configure the sessions with our application
app.use(session({   
	  
	cookieName: 'session',    
	secret: '226_e-store_application',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.login);
app.get('/users', user.list);
app.post('/checkLogin',user.checkLogin);
app.get('/home',routes.home);
app.get('/userHome',routes.userHome);
app.get('/profile',routes.profile);
app.get('/getAllProducts',user.getAllProducts);
app.get('/cart',routes.cart);
app.get('/checkout',routes.checkout);
app.post('/logout',user.logout);
app.get('/getProfile',user.getProfile);
app.post('/saveProfile',user.saveProfile);
app.post('/placeOrder',user.placeOrder);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
