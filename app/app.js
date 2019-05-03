'use strict';

const mdbr = require('./dao/Daodb.js');
const config = require('../config/config.js');

/**
*Get all driver status from db
*/
async function getDriverStatus () {
	//create connection
	let mdb = new mdbr(config.dbInfo);
	await mdb.connectDb();
	let driversStatus = await mdb.getDriverStatus();

	return {
		type: 'DRIVER_STATUS_RESPONSE',
		payload : drivers,
	}
}

/**
*save in db the driver locations
*/
async function saveDriverLocation (location){
	//create connection
	let mdb = new mdbr(config.dbInfo);
	await mdb.connectDb();	
	await mdb.updateDriverLocation(location);	
}

/**
*	find the colsest driver
*/
async function closestDriver (coordinates){
	//create connection
	let mdb = new mdbr(config.dbInfo);
	await mdb.connectDb();
	//get all driver locations from db
	let driversLocations = await mdb.getDriverLocations();

	//return closest driver or null if there aren't drivers
	let closest = driversLocations.reduce((close, driverInfo) => {
		let distance = _calculateDistancesGps(driverInfo.lat,driverInfo.lng, coordinates.lat,coordinates.lng);

		if(close == null || distance < closest.distance){
			close = {
				distance : distance,
				driverId : driverInfo.driverId,
				lat : driverInfo.lat,
				lng : driverInfo.lng
			};
		}

		return close;


	},null);

	return closest;

}

/**
* return distance between two points in m
*/
function _calculateDistancesGps (lat1,lon1,lat2,lon2){
	let eRadius = 6371;
	//latitud distance in radians
	let dLat = _deg2rad(lat2-lat1);
	//latitud distance in radians
	let dLon = _deg2rad(lon2-lon1); 

	let  a = 
    	Math.sin(dLat/2) * Math.sin(dLat/2) +
    	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
   		Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

	// Distance in m
 	let d = R * c*1000; 
	return d;
}

function _deg2rad(deg) {
  return deg * (Math.PI/180)
}


module.exports = {
	getDriverStatus,
	saveDriverLocation,
	closestDriver
}