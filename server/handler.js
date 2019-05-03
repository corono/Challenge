'use strict';
const app = require ('../app/app.js');


/**
* return all driver status
*/
function driverStatusRequest () {
	app.getDriverStatus()
}

/**
* save driver location
*/
function saveDriverLocation (data) {
	app.saveDriverLocation(data.payload);
}



/**
* receives 
```json
{
  "lat": 40.4167426,
  "lng": -3.703002,
}
```
return closest driver id 
*/
function closestDriver (req,res,next) {
	let coordinates = req.body;

	app.closesDriver(coordinates).then((driver) => {
		res.status(200).json(driver);
	}).catch((ex) => {
		res.status(500).json(ex);
	})
	
}

module.exports = {
	driverStatusRequest,
	closestDriver,
	saveDriverLocation
}