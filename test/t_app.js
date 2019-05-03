'use strict';

const should = require('should');
const rewire = require('rewire');
const app = rewire ('../app/app.js');

describe('app test',() => {

	function mdbr(dbInfo) {
		this.connectDb = function () {
			return this;
		},
		this.getDriverStatus = function() {

			let drivers = [
				{
					driverId: 1,
			    	status: 'stoped',
				},
				{
					driverId: 2,
			    	status: 'delivering',
				}
			]

			return drivers;			

		}

		return this;
	},
	this.updateDriverLocation = function (driverInfo) {
		return ({ok : true});
	},
	this.getDriverLocations = function () {
		let drivers = [
				{
					driverId: 1,
			    	lat: 40.213182599999996,
     				lng: -3.7912220000000003
				},
				{
					driverId: 2,
			    	lat: 40.21318,
     				lng: -3.349
				}
			]

			return drivers;
	}

	app.__set__('mdbr',mdbr);


	it('Test driver status', async () => {
		try{
			app.getDriverStatus();
		}catch(ex){
			console.log(ex);
		}

	})
})
