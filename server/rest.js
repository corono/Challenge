'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const handler = require('./handler.js');

/**
* return server socket
*/
function start (port = 40718) {

	server.listen(port);

	//get closest driver
	app.post('/closestDriver',handler.closestDriver);

	io.on('connection', function (socket) {
	  	//console.log('Connection succesfull');
	  	socket.on('DRIVER_STATUS_REQUEST', function (data) {
		  	console.log('--> DRIVER_STATUS_REQUEST');
		  	handler.driverStatusRequest();		  	
		 })

	 	socket.on('DRIVER_GEOLOCATION', function (data) {
		  	console.log('--> DRIVER_GEOLOCATION');
		  	handler.saveDriverLocation(data);
		  })

	});


}




module.exports = {
	start
}