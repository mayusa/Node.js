#!/usr/bin/env node
var debug = require('debug')('websockets');
var app = require('./app');

app.set('port', process.env.PORT || 3000);
//app.set('ipaddress', '10.0.0.5'); //define ipaddress(not using localhost)

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
// socket.io part
var io = require('socket.io'),
	chatter = require('chatter');

var chat_room = io.listen(server);

chatter.set_sockets(chat_room.sockets);
chat_room.sockets.on('connection', function (socket) {
	chatter.connect_chatter({
		socket: socket,
		username: 'new user'
	});
});
