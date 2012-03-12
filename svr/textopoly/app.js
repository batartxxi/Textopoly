/**
 * Module dependencies.
 */

var mongo = require('mongoskin');

var express = require('express'), routes = require('./routes'), models = require('./models/mongodrv');

var app = module.exports = express.createServer()
var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
	socket.on('book', function(data) {
		db.txt.insertTxt(data, function(err, aTxt) {
			socket.broadcast.emit('book', aTxt);
		});
	});
	socket.on('unbook', function(data) {
		db.txt.removeTxt(data, function(err) {
			socket.broadcast.emit('unbook', data);
		});
	});
});
// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.enable("jsonp callback");
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});
// Routes
app.get('/section', routes.section);
app.post('/insert', routes.insert);
app.post('/remove', routes.remove);
app.get('/view', routes.view);
app.get('/mu-f4b76469-c351f596-a13a4cf0-5b357eeb',function(req,res)
{
res.send('42');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
